import { Component, OnInit } from '@angular/core';
import {Month, CustomDate, MoonPhases} from './classes/custom-date';
import {AddEventModal} from './add-event-modal/add-event-modal.page';
import {ModalController} from '@ionic/angular';

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

    constructor(
        public modalController: ModalController
    ) {

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
        this.currentDate = this.date.getMonthDay();

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

    select(day: any){
        this.date.setDay( this.date.getMonth(), day);
        this.currentDate = day;
    }

    getPhase(phase: number){
        switch(phase){
            case 0: {
                return "../assets/img/full_moon.svg";
            }
            case 1: {
                return "../assets/img/wanning_gibbous.svg";
            }
            case 2:{
                return "../assets/img/third_quarter.svg";
            }
            case 3:{
                return "../assets/img/wanning_crescent.svg";
            }
            case 4:{
                return "../assets/img/new_moon.svg";
            }
            case 5:{
                return "../assets/img/waxing_crescent.svg";
            }
            case 6:{
                return "../assets/img/first_quarter.svg";
            }
            case 7:{
                return "../assets/img/waxing_gibbous.svg";
            }
            default:{
                return "../assets/icon/favicon.png";
            }
        }
    }

    async addEvent(){
        console.log("add event");
        const modal = await this.modalController.create({
            component: AddEventModal,
            swipeToClose: true,
            cssClass: 'modal-class',
            showBackdrop: true,
            backdropDismiss: true,
            componentProps: {
                'month': this.currentMonth,
                'day' : this.currentDate,
                'year' : this.currentYear
            }
        });

        return await modal.present();
    }

}