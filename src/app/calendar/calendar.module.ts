import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CalendarRoutingModule} from './calendar-routing.module';
import {CalendarPage} from './calendar.page';

@NgModule({
    declarations: [CalendarPage],
    imports: [
        CommonModule,
        CalendarRoutingModule
    ],
    exports: []
})
export class CalendarModule { }