import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskRoutingModule } from './risk-routing.module';
import { RiskCategoryListComponent } from './risk-category-list/risk-category-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCategoryModalComponent } from './add-edit-category-modal/add-edit-category-modal.component';
import { AddEditFactorModalComponent } from './add-edit-factor-modal/add-edit-factor-modal.component';


@NgModule({
  declarations: [RiskCategoryListComponent, AddEditCategoryModalComponent,AddEditFactorModalComponent],
  imports: [
    CommonModule,
    RiskRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RiskCategoryListComponent,AddEditCategoryModalComponent]
})
export class RiskModule { }
