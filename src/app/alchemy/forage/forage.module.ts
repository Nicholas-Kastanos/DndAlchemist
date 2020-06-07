import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {ForagePageRoutingModule} from './forage-routing.module';

import {ForagePage} from './forage.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ForagePageRoutingModule
    ],
    declarations: [ForagePage],
    exports: [ForagePage]
})
export class ForagePageModule {}