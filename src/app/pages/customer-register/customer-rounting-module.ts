import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRegisterComponent } from './customer-register.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { KycInfoComponent } from './kyc-info/kyc-info.component';
import { PersonMatchListComponent } from './person-match-list/person-match-list.component';

export const customerRoutes: Routes = [
    {
        path: 'wizard',
        component: CustomerRegisterComponent,
        children: [
            { path: '', redirectTo: 'step/1', pathMatch: 'full' },
            { path: 'step/1', component: BasicInfoComponent },
            { path: 'step/2', component: PersonMatchListComponent },
 
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(customerRoutes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
