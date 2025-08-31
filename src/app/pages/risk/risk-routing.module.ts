import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiskCategoryListComponent } from './risk-category-list/risk-category-list.component';

export const riskAssigmentsRoutes: Routes = [



  { path: 'category-list', component: RiskCategoryListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(riskAssigmentsRoutes)],
  exports: [RouterModule]
})
export class RiskRoutingModule { }
