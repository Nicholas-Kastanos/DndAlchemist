import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LineItem } from './line-item.component';
import { ItemDetailModal } from '../item-detail/item-detail.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    LineItem,
    ItemDetailModal
  ],
  exports: [
    LineItem,
    ItemDetailModal
  ]
})
export class LineItemModule { }