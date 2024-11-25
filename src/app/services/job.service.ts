import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';

export type JobSummary = Pick<Job, "id" | "companyName" | "title" | "companyLogo" | "reference">;
export type JobDetailed = Job;

/**
 * Job Service that allows us to manage the jobs data.
 */
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _httpClient: HttpClient = inject(HttpClient);

  private readonly _jobApiUrl: string = '/jobs';

  public getJobs(): Observable<JobSummary[]> {
    return this._httpClient.get<JobSummary[]>(this._jobApiUrl);
  }

  public getJobById(jobId: string): Observable<JobDetailed> {
    return this._httpClient.get<JobDetailed>(`${this._jobApiUrl}/${jobId}`)
  }
}
