import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSummary } from '../../services/job.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent {
  @Input() public job?: JobSummary;
  @Input() public isFavorite: boolean = false;
  @Input() public readonly: boolean = false; // with this, the star icon doesn't appear

  @Output()
  public toggleFavoriteJob: EventEmitter<string> = new EventEmitter<string>();

  protected toggleFavorite(jobId: string) {
    this.toggleFavoriteJob.emit(jobId);
  }
}
