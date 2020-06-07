import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'base-slider',
    pathMatch: 'full'
  },
  {
    path: 'alchemy',
    loadChildren: () => import('./alchemy/alchemy.module').then( m => m.AlchemyModule)
  },
  {
    path: 'base-slider',
    loadChildren: () => import('./shared/base-slider/base-slider.module').then( m => m.BaseSliderPageModule)
  },  {
    path: 'inventory',
    loadChildren: () => import('./gemtech/inventory/inventory.module').then( m => m.InventoryPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
