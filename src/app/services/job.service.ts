import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Job } from '../interfaces/job';

export type JobSummary = Pick<Job, "id" | "companyName" | "title" | "companyLogo" | "reference">;
export type JobDetailed = Job;

/**
 * Job Service that allows us to manage the jobs and the favorite jobs.
 */
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _httpClient: HttpClient = inject(HttpClient);

  private readonly _jobApiUrl: string = '/jobs';
  private readonly FAVORITE_JOBS_LOCAL_STORAGE_KEY = 'favoriteJobs';

  private _favoriteJobsIds = new BehaviorSubject<Set<string>>(this.getFavJobsFromLocalStorage());

  public getJobs(): Observable<JobSummary[]> {
    return this._httpClient.get<JobSummary[]>(this._jobApiUrl);
  }

  public getJobById(jobId: string): Observable<JobDetailed> {
    return this._httpClient.get<JobDetailed>(`${this._jobApiUrl}/${jobId}`)
  }

  /**
   * @returns favorite jobs
   */
  public getFavoriteJobs(): Observable<JobSummary[]> {
    return this.getJobs().pipe(
      // Ici map me permet de transformer les valeurs du tableau avec un filter.
      map((jobs) =>
        jobs.filter((job) => this._favoriteJobsIds.getValue().has(job.id))
      )
    );
  }

  /** Adds the job to the Set */
  public addFavorite(jobId: string): void {
    const favorites = this._favoriteJobsIds.getValue();
    favorites.add(jobId);
    this._favoriteJobsIds.next(new Set(favorites));
    this.setFavJobsInLocalStorage(favorites);
  }


  /** Deletes the job from the Set */
  public removeFavorite(jobId: string): void {
    const favorites = this._favoriteJobsIds.getValue();
    favorites.delete(jobId);
    this._favoriteJobsIds.next(new Set(favorites));
    this.setFavJobsInLocalStorage(favorites);
  }

  public isFavorite(jobId: string): boolean {
    return this._favoriteJobsIds.getValue().has(jobId);
  }

  private getFavJobsFromLocalStorage(): Set<string> {
    const storedJobs = localStorage.getItem(this.FAVORITE_JOBS_LOCAL_STORAGE_KEY);
    const storedSet = storedJobs ? new Set<string>(JSON.parse(storedJobs)) : new Set<string>();
    return storedSet;
  }

  private setFavJobsInLocalStorage(favoriteJobs: Set<string>): void {
    const json = JSON.stringify(Array.from(favoriteJobs));
    localStorage.setItem(this.FAVORITE_JOBS_LOCAL_STORAGE_KEY, json);
  }
}
