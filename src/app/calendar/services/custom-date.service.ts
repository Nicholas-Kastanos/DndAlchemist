interface CustomDateObject {
    dayNum: number;
    year: number;
    weekDay: number;
}

interface MoonObject {
    name: string,
    cycleDay: number,
    phase: number,
    fullCycle: number
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

export const Days = [
    "Undos",
    "Dedos",
    "Tredos",
    "Quadros",
    "Pentos",
    "Hextos",
    "Sentos"
]

export const MoonPhases = [
    "Full Moon",
    "Waning Gibbous",
    "Third Quarter",
    "Waning Crescent",
    "New Moon",
    "Waxing Crescent",
    "FirstQuarter",
    "Waxing Gibbous"
]

const baseDate: CustomDateObject = {dayNum: 1, year: 2547, weekDay: 1};

const AmaltheaBaseDate: CustomDateObject = {dayNum: 9, year: 2547, weekDay: 2};
const CarmeBaseDate: CustomDateObject = {dayNum: 9, year: 2547, weekDay: 2};
const ElaraBaseDate: CustomDateObject = {dayNum: 9, year: 2547, weekDay: 2};
const EnceladusBaseDate: CustomDateObject = {dayNum: 59, year: 2547, weekDay: 3};

export class CustomDate{
    date: CustomDateObject;

    Amalthea: MoonObject = {name: "Amalthea", fullCycle: 10, cycleDay: 0, phase: 0};
    Carme: MoonObject = {name: "Carme", fullCycle: 30, cycleDay: 0, phase: 0};
    Elara: MoonObject = {name: "Elara",fullCycle: 90, cycleDay: 0, phase: 0};
    Enceladus: MoonObject = {name: "Enceladus",fullCycle: 170, cycleDay: 0, phase: 0}

    constructor(year: number, month: number, day: number) {
        this.date = {dayNum: (Months[month].firstDay + day - 1), year: year, weekDay: this.getWeekDay((Months[month].firstDay + day - 1), year)};
        this.getMoonCycles();
    }

    private getWeekDay(dayNum: number, year: number){
        var dayDiff = ((year*daysInYear) + dayNum) - ((baseDate.year*daysInYear) + baseDate.dayNum);

        return (((dayDiff + 1)%7)+7)%7;
    }

    private getMoonCycles(){
        var dayDiff = ((this.date.year*daysInYear) + this.date.dayNum) - ((AmaltheaBaseDate.year*daysInYear) + AmaltheaBaseDate.dayNum);
        this.Amalthea.cycleDay = (((dayDiff + 1)%this.Amalthea.fullCycle)+this.Amalthea.fullCycle)%this.Amalthea.fullCycle;
        this.Amalthea.phase = this.getPhase(this.Amalthea);

        var dayDiff = ((this.date.year*daysInYear) + this.date.dayNum) - ((CarmeBaseDate.year*daysInYear) + CarmeBaseDate.dayNum);
        this.Carme.cycleDay = (((dayDiff + 1)%this.Carme.fullCycle)+this.Carme.fullCycle)%this.Carme.fullCycle;
        this.Carme.phase = this.getPhase(this.Carme);

        var dayDiff = ((this.date.year*daysInYear) + this.date.dayNum) - ((ElaraBaseDate.year*daysInYear) + ElaraBaseDate.dayNum);
        this.Elara.cycleDay = (((dayDiff + 1)%this.Elara.fullCycle)+this.Elara.fullCycle)%this.Elara.fullCycle;
        this.Elara.phase = this.getPhase(this.Elara);

        var dayDiff = ((this.date.year*daysInYear) + this.date.dayNum) - ((EnceladusBaseDate.year*daysInYear) + EnceladusBaseDate.dayNum);
        this.Enceladus.cycleDay = (((dayDiff + 1)%this.Enceladus.fullCycle)+this.Enceladus.fullCycle)%this.Enceladus.fullCycle;
        this.Enceladus.phase = this.getPhase(this.Enceladus);
    }

    private getPhase(moon: MoonObject){
        var percentDone = (moon.cycleDay/moon.fullCycle)*100;
        if(percentDone < 12.5){
            return 0;
        }else if(percentDone < 25){
            return 1;
        }else if(percentDone < 37.5){
            return 2;
        }else if(percentDone < 50){
            return 3;
        }else if(percentDone < 62.5){
            return 4;
        }else if(percentDone < 75){
            return 5;
        }else if(percentDone < 87.5){
            return 6;
        }else{
            return 7;
        }
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
        this.getMoonCycles();
        this.date.weekDay = this.getWeekDay(this.date.dayNum, this.date.year);
    }

    setYear(year: number){
        this.date.year = year;
        this.getMoonCycles();
        this.date.weekDay = this.getWeekDay(this.date.dayNum, this.date.year);
    }

    getDaysInMonth(month: number){
        return Months[month].days;
    }

    getDateFull(){
        return this.date;
    }

    getMoons(){
        return [this.Amalthea, this.Carme, this.Elara, this.Enceladus];
    }
}
