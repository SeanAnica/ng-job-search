import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JobDetailed, JobService } from '../../services/job.service';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  private readonly _jobService = inject(JobService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly jobDetails$: Observable<JobDetailed> = this._activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const jobId = params.get('jobId') ?? ''; // Récupère l'id dans l'url depuis activated route
      return this._jobService.getJobById(jobId); // Récupérer le job
    })
  );
}
