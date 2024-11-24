import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../interfaces/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  private readonly _jobService = inject(JobService);

  protected allJobs$: Observable<Job[]> = this._jobService.getJobs();
}
