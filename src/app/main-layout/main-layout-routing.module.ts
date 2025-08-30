import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SanctionSearchResultService } from '../services/sanction-search-result/sanction-search-result.service';

export const mainLayoutRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      // { path: 'dashboard', loadComponent: () => import('../dashboard/dashboard.component').then(m => m.DashboardComponent) },
      {
        path: 'users',

        loadChildren: () => import('../pages/users/users.module').then(m => m.UsersModule),
        title: 'User List'
      },

      {
        path: 'customer-register',
        loadChildren: () =>
          import('../pages/customer-register/customer.module')
            .then(m => m.CustomerModule),
        title: 'Customer Information'

      },
      {
        path: 'sanctions',
        loadChildren: () =>
          import('../pages/sanctions/sanctions.module')
            .then(m => m.SanctionsModule),
        title: 'sanction Information'

      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('../pages/dashboard/dashboard.module')
            .then(m => m.DashboardModule),
        title: 'sanction Information'

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
