import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-donut',
  standalone: false,
  templateUrl: './chart-donut.component.html',
  styleUrl: './chart-donut.component.scss'
})
export class ChartDonutComponent {
  @Input() categories: string[] = [];
  @Input() series: any[] = []; // follow Apex format [{name, data}]
  @Input() title?: string;
}
