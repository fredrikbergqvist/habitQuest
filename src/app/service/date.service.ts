import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

    constructor() {}

    getWeekNumber(): number {
        let d: any = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart: any = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
    };

    isCurrentDay(day:number):boolean{
        return day === new Date().getDate();
    }

    isCurrentWeek(weekNumber:number):boolean{
        return weekNumber === this.getWeekNumber();
    }

    isCurrentMonth(month:number):boolean{
        return month === (new Date().getMonth() + 1);
    }

}
