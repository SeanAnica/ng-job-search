import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JobItemComponent } from '../job-item/job-item.component';
import { JobService, JobSummary } from '../../services/job.service';
import { map, Observable } from 'rxjs';
import { FavoriteJobService } from '../../services/favorite-job.service';

@Component({
  selector: 'app-favorites-jobs-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './favorites-jobs-list.component.html',
  styleUrl: './favorites-jobs-list.component.css'
})
export class FavoritesJobsListComponent {
  private readonly _jobService: JobService = inject(JobService);
  private readonly _favoriteJobService: FavoriteJobService = inject(FavoriteJobService);

  /** Use map to transform data and filter the favorite jobs from the job service result */
  protected favoriteJobs$: Observable<JobSummary[]> = this._jobService.getJobs().pipe(
    map((jobs) => jobs.filter((job) => this._favoriteJobService.isJobFavorite(job.id)))
  );
}
