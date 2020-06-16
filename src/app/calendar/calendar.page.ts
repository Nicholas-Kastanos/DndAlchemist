import { Component, OnInit } from '@angular/core';
import {Month, CustomDate} from './services/custom-date.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss']
})
export class CalendarPage implements OnInit {
    date: CustomDate;
    daysInThisMonth: any;
    daysInLastMonth: any;
    daysInNextMonth: any;
    monthNames: string[];
    currentMonth: any;
    currentYear: any;
    currentDate: any;

    constructor() {

        this.date = new CustomDate(2547, 1, 1);
        this.monthNames = [
            "Renovae",
            "Fleurnae",
            "Golenae",
            "Vuurnae",
            "Zeledrae",
            "Krisnae",
            "Fandrae",
            "Foznae",
            "Senae",
            "Dokdrae"
        ];
        

        this.getDaysOfMonth();
    }

    ngOnInit() { }

    getDaysOfMonth() {
        this.currentMonth = this.date.getMonthName();
        this.currentYear = this.date.getYear();
        this.currentDate = this.date;

        this.daysInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();

        var firstDayThisMonth = (new CustomDate(this.date.getYear(), this.date.getMonth(), 1)).getDay();
        var prevNumOfDays = this.date.getDaysInMonth((((this.date.getMonth() - 1) % 10)+10)%10);
        for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }

        var thisNumOfDays = this.date.getDaysInMonth(this.date.getMonth());
        for (var i = 0; i < thisNumOfDays; i++) {
            this.daysInThisMonth.push(i + 1);
        }

        var lastDayThisMonth = (new CustomDate(this.date.getYear(), this.date.getMonth(), this.date.getDaysInMonth(this.date.getMonth()))).getDay();
        var nextNumOfDays = this.date.getDaysInMonth((this.date.getMonth() + 1) % 10);
        for (var i = 0; i < (6 - lastDayThisMonth); i++) {
            this.daysInNextMonth.push(i + 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
                this.daysInNextMonth.push(i);
            }
        }
    }

    goToLastMonth() {
        this.date = this.date.getMonth() == 0 ? 
        new CustomDate(this.date.getYear() - 1, 9, this.date.getDaysInMonth(9)) :
         new CustomDate(this.date.getYear(), this.date.getMonth() - 1, this.date.getDaysInMonth(this.date.getMonth() - 1));
         this.getDaysOfMonth();
    }

    goToNextMonth() {
        this.date = this.date.getMonth() == 9 ?
        new CustomDate(this.date.getYear() + 1, 0, 1) :
        new CustomDate(this.date.getYear(), this.date.getMonth() + 1, 1);
        this.getDaysOfMonth();
    }

}