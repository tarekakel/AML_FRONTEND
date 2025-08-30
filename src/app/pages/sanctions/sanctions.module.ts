import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListViewComponent } from './search-list-view/search-list-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SanctionRoutingModule } from './sanction-rounting-module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [SearchListViewComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    SharedModule,
    SanctionRoutingModule,
    BsDatepickerModule
  ]
})
export class SanctionsModule { }
