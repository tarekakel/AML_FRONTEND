import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { CustomerRegisterComponent } from './customer-register.component';
import { CustomerRoutingModule } from './customer-rounting-module';
import { KycInfoComponent } from './kyc-info/kyc-info.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PersonMatchListComponent } from './person-match-list/person-match-list.component';
import { PersonDetailsModalComponent } from './person-details-modal/person-details-modal.component';


@NgModule({
  declarations: [
    CustomerRegisterComponent,
    BasicInfoComponent,
    KycInfoComponent,
    PersonMatchListComponent,
    PersonDetailsModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CustomerRoutingModule,
    BsDatepickerModule
  ]
})
export class CustomerModule { }
