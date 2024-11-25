import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JobService, JobSummary } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { JobItemComponent } from '../job-item/job-item.component';
import { FavoriteJobService } from '../../services/favorite-job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  private readonly _jobService = inject(JobService);
  private readonly _favoriteJobService = inject(FavoriteJobService);

  protected allJobs$: Observable<JobSummary[]> = this._jobService.getJobs();

  /**
   * Adds or removes job id from favorites when clicking on the star.
   * @param jobId job id to add or delete
   */
  protected manageToggleFavorite(jobId: string): void {
    if (this._favoriteJobService.isJobFavorite(jobId)) {
      this._favoriteJobService.removeFavorite(jobId);
    } else {
      this._favoriteJobService.addFavorite(jobId);
    }
  }

  protected isFavorite(jobId: string): boolean {
    return this._favoriteJobService.isJobFavorite(jobId);
  }
}
