import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {BrewPageRoutingModule} from './brew-routing.module';

import {BrewPage} from './brew.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BrewPageRoutingModule
    ],
    declarations: [BrewPage],
    exports: [BrewPage]
})
export class BrewPageModule {}