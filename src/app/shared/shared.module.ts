import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './component/loader/loader.component';
import { ConfimDialogeComponent } from './component/confim-dialoge/confim-dialoge.component';
import { KpiCardComponent } from './component/kpi-card/kpi-card.component';
import { TrendBadgeComponent } from './component/trend-badge/trend-badge.component';
import { ChartLineComponent } from './component/chart-line/chart-line.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartBarComponent } from './component/chart-bar/chart-bar.component';
import { ChartDonutComponent } from './component/chart-donut/chart-donut.component';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

@NgModule({
     
    declarations: [
        LoaderComponent,
        ConfimDialogeComponent,
        KpiCardComponent,
        TrendBadgeComponent,
        ChartLineComponent,
        ChartBarComponent,
        ChartDonutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgApexchartsModule,
        NgHeroiconsModule
        
        
    ],
    exports: [
        LoaderComponent,
        ConfimDialogeComponent,
        KpiCardComponent,
        TrendBadgeComponent,
        ChartLineComponent,
        NgApexchartsModule,
        ChartBarComponent,
        ChartDonutComponent
    ]
})
export class SharedModule { }
