import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaseSliderPageRoutingModule } from './base-slider-routing.module';

import { BaseSliderPage } from './base-slider.page';

import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaseSliderPageRoutingModule,
    SharedModule
  ],
  declarations: [BaseSliderPage]
})
export class BaseSliderPageModule {}
