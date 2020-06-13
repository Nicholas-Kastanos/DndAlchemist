import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {BrewSelectPageRoutingModule} from './brewSelect-routing.module';

import {BrewSelectPage} from './brewSelect.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BrewSelectPageRoutingModule
    ],
    declarations: [BrewSelectPage],
    exports: [BrewSelectPage]
})
export class BrewSelectPageModule {}