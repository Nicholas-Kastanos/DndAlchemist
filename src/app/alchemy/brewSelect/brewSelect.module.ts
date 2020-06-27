import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {BrewSelectPageRoutingModule} from './brewSelect-routing.module';

import {BrewSelectPage} from './brewSelect.page';
import {BrewComponent} from '../brew/brew.page';
import {LineItemPageModule} from '../line-item/line-item.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BrewSelectPageRoutingModule,
        LineItemPageModule
    ],
    declarations: [
        BrewSelectPage,
        BrewComponent
    ],
    exports: [BrewSelectPage]
})
export class BrewSelectPageModule {}