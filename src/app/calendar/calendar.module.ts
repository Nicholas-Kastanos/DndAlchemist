import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CalendarRoutingModule} from './calendar-routing.module';
import {CalendarPage} from './calendar.page';
import {AddEventModalPageModule} from './add-event-modal/add-event-modal.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        CalendarPage
    ],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        AddEventModalPageModule,
        IonicModule
    ],
    exports: []
})
export class CalendarModule { }