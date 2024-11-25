import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JobDetailed, JobService } from '../../services/job.service';
import { Observable, of, switchMap } from 'rxjs';
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

  protected readonly jobDetails$: Observable<JobDetailed> = this._activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const jobId = params.get('jobId'); // Récupère l'id dans l'url depuis activated route
      return jobId? this._jobService.getJobById(jobId) : of(); // Récupérer le job
    })
  );
}
