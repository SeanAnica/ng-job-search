import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _httpClient: HttpClient = inject(HttpClient);

  private _jobApiUrl: string = '/jobs';

  public getJobs(): Observable<Job[]> {
    return this._httpClient.get<Job[]>(this._jobApiUrl);
  }

  public getJobById(id: number): Observable<Job> {
    return this._httpClient.get<Job>(`${this._jobApiUrl}/${id}`)
  }
}
