import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { html } from '../../../interfaces/job';

/** Couleurs possibles pour un pill badge */
export enum PillColor {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
  Light = "light",
  Dark = "dark"
}

@Component({
  selector: 'app-pill-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pill-badge.component.html',
  styleUrl: './pill-badge.component.css'
})
export class PillBadgeComponent implements OnChanges{
  @Input() public pillContent?: html;
  @Input() public pillColor: PillColor = PillColor.Primary;

  protected pillClass: string = '';

  public ngOnChanges(changes: SimpleChanges): void {
      if(changes['pillColor']){
        this.pillClass = this.generatePillClass(this.pillColor);
      }
  }

  private generatePillClass(color: string): string {
    return `badge rounded-pill text-bg-${color}`
  }
}
