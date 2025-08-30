import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchListViewComponent } from "./search-list-view/search-list-view.component";


export const sanctionRoutes: Routes = [
    {
        path: '',

        children: [
            { path: '', redirectTo: 'search-result', pathMatch: 'full' },
            { path: 'search-result', component: SearchListViewComponent },


        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(sanctionRoutes)],
    exports: [RouterModule]
})
export class SanctionRoutingModule { }