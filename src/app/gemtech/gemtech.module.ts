import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GemtechPageRoutingModule } from './gemtech-routing.module';

import { GemtechPage } from './gemtech.page';
import {GemtechInventoryPageModule} from './inventory/inventory.module'
import {FullListPageModule} from './full-list/full-list.module';

@NgModule({
  declarations: [GemtechPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GemtechPageRoutingModule,
    GemtechInventoryPageModule,
    FullListPageModule
  ],
  exports: []
})
export class GemtechModule {}
