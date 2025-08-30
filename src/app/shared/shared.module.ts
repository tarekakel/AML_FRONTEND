import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './component/loader/loader.component';
import { ConfimDialogeComponent } from './component/confim-dialoge/confim-dialoge.component';


@NgModule({
    declarations: [
        LoaderComponent,
        ConfimDialogeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        
    ],
    exports: [
        LoaderComponent,
        ConfimDialogeComponent
    ]
})
export class SharedModule { }
