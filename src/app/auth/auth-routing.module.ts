import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent), title: 'Login'
      },
      { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent), title: 'Register' },
      { path: 'forget-password', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent), title: 'Forget assword' },
      { path: 'reset-password/:uid/:token', loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent), title: 'Reset assword' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})


export class AuthRoutingModule { }
