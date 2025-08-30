import { Routes } from '@angular/router';

import { mainLayoutRoutes } from './main-layout/main-layout-routing.module';
import { authRoutes } from './auth/auth-routing.module';
import { sanctionRoutes } from './pages/sanctions/sanction-rounting-module';

export const routes: Routes = [
    ...authRoutes,                 // No layout for login/register
    ...mainLayoutRoutes,  
   
    { path: '', redirectTo: '/auth/login', pathMatch: 'full', title: 'Login' },
    {
        path: '**', redirectTo: '/auth/login', title: 'Login'
    } // catch-all

];