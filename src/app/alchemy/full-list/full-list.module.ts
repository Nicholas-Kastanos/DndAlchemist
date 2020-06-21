import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FullListPageRoutingModule} from './full-list-routing.module';

import {FullListPage} from './full-list.page';
import {LineItemPageModule} from '../line-item/line-item.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FullListPageRoutingModule,
        LineItemPageModule
    ],
    declarations: [FullListPage],
    exports: [FullListPage]
})
export class FullListPageModule {}