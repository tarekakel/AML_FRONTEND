import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './component/loader/loader.component';


@NgModule({
    declarations: [
        LoaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        LoaderComponent
    ]
})
export class SharedModule { }
