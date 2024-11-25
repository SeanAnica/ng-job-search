import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JobDetailed, JobService } from '../../services/job.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PillBadgeComponent, PillColor } from '../shared/pill-badge/pill-badge.component';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink, PillBadgeComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  private readonly _jobService = inject(JobService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  public readonly PillColor = PillColor;

  protected readonly jobDetails$: Observable<JobDetailed | null> = this._activatedRoute.paramMap.pipe(
    // switchmap pour transformer l'observable de la valeur de la route en observable content le job details.
    switchMap((params) => {
      const jobId = params.get('jobId'); // Récupère l'id dans l'url depuis activated route
      if (!jobId) return of(null);
      return this._jobService.getJobById(jobId);
    })
  );

  protected readonly jobTypesAndIndustries$: Observable<string[]> = this.jobDetails$.pipe(
    map((details) => {
      const types = details?.types ?? [];
      const industries = details?.industries ?? [];
      return [...types, ...industries];
    })
  );
}
