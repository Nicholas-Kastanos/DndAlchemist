import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlchemyPage } from './alchemy.page';


const routes: Routes = [
  {
    path: '',
    component: AlchemyPage
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.AlchemyInventoryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlchemyRoutingModule { }
