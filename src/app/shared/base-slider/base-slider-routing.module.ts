import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseSliderPage } from './base-slider.page';

const routes: Routes = [
  {
    path: '',
    component: BaseSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseSliderPageRoutingModule {}
