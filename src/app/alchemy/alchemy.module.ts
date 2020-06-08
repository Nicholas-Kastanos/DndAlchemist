import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlchemyRoutingModule } from './alchemy-routing.module';
import { AlchemyInventoryPageModule } from './inventory/inventory.module'
import { AlchemyPage } from './alchemy.page';
import {BrewPageModule} from './brew/brew.module';
import {ForagePageModule} from './forage/forage.module';
import {FullListPageModule} from './full-list/full-list.module';

@NgModule({
  declarations: [AlchemyPage],
  imports: [
    CommonModule,
    AlchemyRoutingModule,
    AlchemyInventoryPageModule,
    BrewPageModule,
    ForagePageModule,
    FullListPageModule
  ],
  exports: []
})
export class AlchemyModule { }
