import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JobItemComponent } from '../job-item/job-item.component';
import { JobService, JobSummary } from '../../services/job.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites-jobs-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './favorites-jobs-list.component.html',
  styleUrl: './favorites-jobs-list.component.css'
})
export class FavoritesJobsListComponent {
  private readonly _jobService: JobService = inject(JobService);

  protected favoriteJobs$: Observable<JobSummary[]> = this._jobService.getFavoriteJobs();

}
