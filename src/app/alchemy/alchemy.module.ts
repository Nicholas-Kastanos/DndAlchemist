import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlchemyRoutingModule } from './alchemy-routing.module';
import { AlchemyInventoryPageModule } from './inventory/inventory.module'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlchemyRoutingModule,
    AlchemyInventoryPageModule
  ],
  exports: [AlchemyInventoryPageModule]
})
export class AlchemyModule { }
