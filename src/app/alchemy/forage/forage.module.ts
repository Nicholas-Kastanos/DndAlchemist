import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ForagePageRoutingModule } from './forage-routing.module';
import { ForagePage } from './forage.page';
import { ForageResultComponent } from '../forage-result/forage-result.component';
import { LineItemModule } from '../line-item/line-item.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        ForagePageRoutingModule,
        LineItemModule
    ],
    declarations: [
        ForagePage,
        ForageResultComponent
    ],
    exports: [ForagePage]
})
export class ForagePageModule { }