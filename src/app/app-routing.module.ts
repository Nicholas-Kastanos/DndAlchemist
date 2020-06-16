import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'alchemy',
    pathMatch: 'full'
  },
  {
    path: 'alchemy',
    loadChildren: () => import('./alchemy/alchemy.module').then( m => m.AlchemyModule)
  },
  {
    path: 'gemtech',
    loadChildren: () => import('./gemtech/gemtech.module').then( m => m.GemtechModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
