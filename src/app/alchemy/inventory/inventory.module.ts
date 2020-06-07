import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { AlchemyInventoryPage } from './inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule
  ],
  declarations: [AlchemyInventoryPage],
  exports: [AlchemyInventoryPage]
})
export class AlchemyInventoryPageModule {}
