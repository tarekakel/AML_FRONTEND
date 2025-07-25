import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const mainLayoutRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      // { path: 'dashboard', loadComponent: () => import('../dashboard/dashboard.component').then(m => m.DashboardComponent) },
      {
        path: 'users',

        loadChildren: () => import('../pages/users/users.module').then(m => m.UsersModule)
      },
      // Add more child routes here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainLayoutRoutes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
