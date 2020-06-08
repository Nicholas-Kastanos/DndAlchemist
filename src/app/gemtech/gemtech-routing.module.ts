import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GemtechPage } from './gemtech.page';

const routes: Routes = [
  {
    path: '',
    component: GemtechPage
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.GemtechInventoryPageModule)
  },
  {
    path: 'full-list',
    loadChildren: () => import('./full-list/full-list.module')
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GemtechPageRoutingModule {}
