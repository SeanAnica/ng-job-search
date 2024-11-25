import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Job } from '../interfaces/job';

export type JobSummary = Pick<Job, "id" | "companyName" | "title" | "companyLogo" | "reference">;
export type JobDetailed = Job;

/**
 * Service des jobs qui permet de gérer les jobs et les jobs favoris.
 */
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _httpClient: HttpClient = inject(HttpClient);

  private readonly _jobApiUrl: string = '/jobs';

  private _favoriteJobsIds = new BehaviorSubject<Set<string>>(new Set());

  public getJobs(): Observable<JobSummary[]> {
    return this._httpClient.get<JobSummary[]>(this._jobApiUrl);
  }

  public getJobById(jobId: string): Observable<JobDetailed> {
    return this._httpClient.get<JobDetailed>(`${this._jobApiUrl}/${jobId}`)
  }

  /**
   * @returns jobs favoris
   */
  public getFavoriteJobs(): Observable<JobSummary[]> {
    return this.getJobs().pipe(
      // Ici map me permet de transformer les valeurs du tableau avec un filter.
      map((jobs) =>
        jobs.filter((job) => this._favoriteJobsIds.getValue().has(job.id))
      )
    );
  }

  /** Ajoute le job au set */
  public addFavorite(jobId: string): void {
    const favorites = this._favoriteJobsIds.getValue();
    favorites.add(jobId);
    this._favoriteJobsIds.next(new Set(favorites));
  }


  /** Supprime le job au set */
  public removeFavorite(jobId: string): void {
    const favorites = this._favoriteJobsIds.getValue();
    favorites.delete(jobId);
    this._favoriteJobsIds.next(new Set(favorites));
  }

  public isFavorite(jobId: string): boolean {
    return this._favoriteJobsIds.getValue().has(jobId);
  }
}
