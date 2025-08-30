import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-bar',
  standalone: false,
  templateUrl: './chart-bar.component.html',
  styleUrl: './chart-bar.component.scss'
})
export class ChartBarComponent implements OnInit {

  @Input() categories: string[] = [];
  @Input() series: any[] = []; // [{ name: string, data: number[] }]
  @Input() title?: string;

  // Optional dynamic chart options
  @Input() stacked: boolean = false;
  @Input() height: number = 300;
  @Input() colors: string[] = [];
  @Input() horizontal: boolean = false;

  chartOptions: any = {};

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: this.height,
        stacked: this.stacked,
        toolbar: { show: true },
      },
      xaxis: {
        categories: this.categories
      },
      plotOptions: {
        bar: { horizontal: this.horizontal }
      },
      colors: this.colors.length ? this.colors : undefined,
      legend: { show: true },
      tooltip: { enabled: true },
    };
  }
}
