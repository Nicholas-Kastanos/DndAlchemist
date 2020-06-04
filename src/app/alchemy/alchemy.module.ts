import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlchemyRoutingModule } from './alchemy-routing.module';
import { InventoryPageModule } from './inventory/inventory.module'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlchemyRoutingModule
  ]
})
export class AlchemyModule { }
