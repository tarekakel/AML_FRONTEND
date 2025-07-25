import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authRoutes: Routes = [
 {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})


export class AuthRoutingModule { }
