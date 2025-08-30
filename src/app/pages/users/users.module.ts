import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './user-list/user-list.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [UsersComponent, UserModalComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    
  ],
})
export class UsersModule { }
