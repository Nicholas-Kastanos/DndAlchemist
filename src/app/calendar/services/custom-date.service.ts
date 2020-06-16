import {Injectable} from '@angular/core';

interface CustomDateObject {
    dayNum: number;
    year: number;
    weekDay: number;
}

const Months = [
    {name:"Renovae", days: 50, firstDay: 1},
    {name:"Fleurenae", days:47, firstDay:51},
    {name:"Golenae", days:32, firstDay: 98},
    {name:"Vuurnae", days:33, firstDay: 130},
    {name:"Zeledrae", days:32, firstDay: 163},
    {name:"Krisnae", days:50, firstDay: 195},
    {name:"Fandrae", days:47, firstDay: 245},
    {name:"Foznae", days:32, firstDay: 292},
    {name:"Senae", days:33, firstDay: 324},
    {name:"Dokdrae", days:32, firstDay: 357}
];

export enum Month{
    Renovae = 0,
    Fleurnae = 1,
    Golenae = 2,
    Vuurnae = 3,
    Zeledrae = 4,
    Krisnae = 5,
    Fandrae = 6,
    Foznae = 7,
    Senae = 8,
    Dokdrae = 9
}

const daysInYear = 388;

const Days = [
    "Undos",
    "Dedos",
    "Tredos",
    "Quadros",
    "Pentos",
    "Hextos",
    "Sentos"
]

const baseDate: CustomDateObject = {dayNum: 1, year: 2547, weekDay: 1};

export class CustomDate{
    date: CustomDateObject;

    constructor(year: number, month: number, day: number) {
        this.date = {dayNum: (Months[month].firstDay + day - 1), year: year, weekDay: this.getWeekDay((Months[month].firstDay + day - 1), year)};
    }

    private getWeekDay(dayNum: number, year: number){
        // mod total number of days off base day
        // ((year*388+day) - (newyear*388+newday))mod(7)+1
        // if negative add 2
        var dayDiff = ((year*daysInYear) + dayNum) - ((baseDate.year*daysInYear) + baseDate.dayNum);

        return (((dayDiff + 1)%7)+7)%7;
    }

    getDay(){
        return this.date.weekDay;
    }

    getMonth(){
        if(this.date.dayNum < Months[1].firstDay){
            return 0;
        }else if(this.date.dayNum < Months[2].firstDay){
            return 1;
        }else if(this.date.dayNum < Months[3].firstDay){
            return 2;
        }else if(this.date.dayNum < Months[4].firstDay){
            return 3;
        }else if(this.date.dayNum < Months[5].firstDay){
            return 4;
        }else if(this.date.dayNum < Months[6].firstDay){
            return 5;
        }else if(this.date.dayNum < Months[7].firstDay){
            return 6;
        }else if(this.date.dayNum < Months[8].firstDay){
            return 7;
        }else if(this.date.dayNum < Months[9].firstDay){
            return 8;
        }else{
            return 9;
        }
    }

    getMonthName(){
        return Months[this.getMonth()].name;
    }

    getMonthDay(){
        var month = Months[this.getMonth()];
        return (this.date.dayNum - month.firstDay + 1);
    }

    getYear(){
        return this.date.year;
    }

    getWeekDayName(){
        return Days[this.date.weekDay];
    }

    setDay(month: number, day: number){
        this.date.dayNum = (Months[month].firstDay + day - 1);
    }

    setYear(year: number){
        this.date.year = year;
    }

    getDaysInMonth(month: number){
        return Months[month].days;
    }

    getDateFull(){
        return this.date;
    }
}
