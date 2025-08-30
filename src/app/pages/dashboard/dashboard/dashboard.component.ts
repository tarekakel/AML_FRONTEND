import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashbaord/dashboard.service';
import { DASHBOARD_DATA } from '../../../shared/constant';
import { DashboardData } from '../../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  dashboardData: DashboardData[] = [];
  kpiItems: DashboardData[] = [];
  trendItems: DashboardData[] = [];

  chartConfigs: { title: string, categories: string[], series: any[], stackedBar: boolean, chartType: string }[] = [];

  constructor(private dashService: DashboardService) {

  }

  ngOnInit(): void {
    this.getDashboardData();
  }


  getDashboardData() {
    this.dashService.getDashboardData(DASHBOARD_DATA).subscribe(res => {
      if (res.isSuccess) {

        this.dashboardData = res.data;

        // dashboard.component.ts
        this.kpiItems = this.dashboardData.filter(d => d.type === 'kpi');
        this.trendItems = this.dashboardData.filter(d => d.type === 'trend');
        this.initCharts();

      }
    });
  }

  kpiColors: Record<string, any> = {
    total_decisions: 'green',
    auto_rejected_matches: 'red',
    high_risk_decisions: 'orange',
    total_audit: 'blue',
  };

  initCharts() {

    this.chartConfigs = this.trendItems.map(item => {
      let categories: string[] = [];
      let series: any[] = [];
      let stackedBar: boolean = false;
      let chartType: string = '';

      if (item.code === 'total_action_type_act_status') {
        // stacked bar
        categories = Array.from(new Set(item.data.map(d => d.action_type)));
        const statuses = Array.from(new Set(item.data.map(d => d.act_status)));
        series = statuses.map(status => {
          return {
            name: status,
            data: categories.map(cat => {
              const row = item.data.find(d => d.action_type === cat && d.act_status === status);
              return row ? row.total : 0;
            })
          };
        });
        stackedBar = true;
        chartType = 'bar';
      } else if (item.code === 'high_score_alerts') {
        // line chart example, using days as categories
        categories = item.data.map(d => d.day);
        series = [
          { name: 'Total Decisions', data: item.data.map(d => d.total_decisions) },
          { name: 'High Score Accepted', data: item.data.map(d => d.high_score_accepted) }
        ];
        chartType = 'line';
      }

      return { title: item.title, categories, series, stackedBar, chartType };
    });
  }

}
