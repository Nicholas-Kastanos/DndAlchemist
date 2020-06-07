import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlchemyRoutingModule } from './alchemy-routing.module';
import { AlchemyInventoryPageModule } from './inventory/inventory.module'
import { AlchemyPage } from './alchemy.page';


@NgModule({
  declarations: [AlchemyPage],
  imports: [
    CommonModule,
    AlchemyRoutingModule,
    AlchemyInventoryPageModule
  ],
  exports: [AlchemyInventoryPageModule]
})
export class AlchemyModule { }
