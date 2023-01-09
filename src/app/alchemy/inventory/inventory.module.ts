import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';
import { AlchemyInventoryPage } from './inventory.page';
import { LineItemModule } from '../line-item/line-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule,
    LineItemModule
  ],
  declarations: [
    AlchemyInventoryPage,
  ],
  exports: [AlchemyInventoryPage]
})
export class AlchemyInventoryPageModule { }
