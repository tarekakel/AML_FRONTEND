import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './user-list/user-list.component';


export const usersRoutes: Routes = [
  { path: 'users-list', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
