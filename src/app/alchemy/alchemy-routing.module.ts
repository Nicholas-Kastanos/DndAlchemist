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
  {
    path: 'brew',
    loadChildren: () => import('./brewSelect/brewSelect.module').then(m => m.BrewSelectPageModule)
  },
  {
    path: 'forage',
    loadChildren: () => import('./forage/forage.module').then(m => m.ForagePageModule)
  },
  {
    path: 'full-list',
    loadChildren: () => import('./full-list/full-list.module').then(m => m.FullListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlchemyRoutingModule { }
