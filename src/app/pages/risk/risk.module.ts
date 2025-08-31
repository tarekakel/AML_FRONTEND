import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskRoutingModule } from './risk-routing.module';
import { RiskCategoryListComponent } from './risk-category-list/risk-category-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RiskCategoryListComponent],
  imports: [
    CommonModule,
    RiskRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RiskCategoryListComponent]
})
export class RiskModule { }
