import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { AlchemyInventoryPage } from './inventory.page';
import {LineItem} from '../line-item/line-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule
  ],
  declarations: [
    AlchemyInventoryPage,
    LineItem
  ],
  exports: [AlchemyInventoryPage]
})
export class AlchemyInventoryPageModule {}
