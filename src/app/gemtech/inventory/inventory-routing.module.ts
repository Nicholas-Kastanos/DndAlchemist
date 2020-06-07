import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GemtechInventoryPage } from './inventory.page';

const routes: Routes = [
  {
    path: '',
    component: GemtechInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryPageRoutingModule {}
