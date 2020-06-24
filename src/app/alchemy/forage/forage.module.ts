import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {ForagePageRoutingModule} from './forage-routing.module';

import {ForagePage} from './forage.page';
import {ForageResultComponent} from '../forage-result/forage-result.component';
import {LineItemPageModule} from '../line-item/line-item.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        ForagePageRoutingModule,
        LineItemPageModule
    ],
    declarations: [
        ForagePage,
        ForageResultComponent
    ],
    exports: [ForagePage]
})
export class ForagePageModule {}