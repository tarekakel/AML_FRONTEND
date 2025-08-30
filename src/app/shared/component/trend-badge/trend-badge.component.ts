import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trend-badge',
  standalone: false,
  templateUrl: './trend-badge.component.html',
  styleUrl: './trend-badge.component.scss'
})


export class TrendBadgeComponent { @Input() value = 0; get isUp() { return this.value >= 0 } }
