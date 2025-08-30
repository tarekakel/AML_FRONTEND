import { Component, Input, OnInit } from '@angular/core';
import { TrendBadgeComponent } from "../trend-badge/trend-badge.component";
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
  standalone: false
})


export class KpiCardComponent implements OnInit {
  @Input() label = '';
  @Input() value: number = 0;
  @Input() hint?: string;
  @Input() trend?: number; // fractional e.g. 0.12 or -0.08
  @Input() image?: string;
  @Input() bgColor?: string;

  displayedValue: number = 0;

  ngOnInit(): void {
    const steps = 30; // number of increments
    const increment = this.value / steps;
    interval(30).pipe(take(steps)).subscribe((i) => {
      this.displayedValue = Math.min(this.value, Math.round(increment * (i + 1)));
    });
  }
}
