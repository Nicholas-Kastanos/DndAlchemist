import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlchemyInventoryPage } from './inventory.page';

const routes: Routes = [
  {
    path: '',
    component: AlchemyInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryPageRoutingModule {}
