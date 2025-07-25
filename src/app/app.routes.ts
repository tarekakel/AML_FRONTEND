import { Routes } from '@angular/router';

import { mainLayoutRoutes } from './main-layout/main-layout-routing.module';
import { authRoutes } from './auth/auth-routing.module';
export const routes: Routes = [
    ...authRoutes,                 // No layout for login/register
    ...mainLayoutRoutes,          // Wrap all others in MainLayout
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' } // catch-all

];