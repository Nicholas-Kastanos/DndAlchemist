import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GemtechPageRoutingModule } from './gemtech-routing.module';

import { GemtechPage } from './gemtech.page';
import {GemtechInventoryPageModule} from './inventory/inventory.module'

@NgModule({
  declarations: [GemtechPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GemtechPageRoutingModule,
    GemtechInventoryPageModule
  ],
  exports: [GemtechInventoryPageModule]
})
export class GemtechModule {}
