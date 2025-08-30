import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-line',
  standalone: false,
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.scss'
})
export class ChartLineComponent {
  @Input() categories: string[] = [];
  @Input() series: any[] = []; // [{name: string, data: number[]}]
  @Input() title?: string;
  @Input() height: number = 300;
  @Input() smooth: boolean = true;



  // Optional dynamic chart options
  @Input() stacked: boolean = false;
  @Input() colors: string[] = [];
  @Input() horizontal: boolean = false;

  chartOptions: any = {};

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: this.height,

        toolbar: { show: true },
      },
      xaxis: {
        categories: this.categories
      },

      colors: this.colors.length ? this.colors : undefined,
      legend: { show: true },
      tooltip: { enabled: true },
    };
  }
}
