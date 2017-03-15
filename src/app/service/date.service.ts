import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

    constructor() {
    }

    getWeekNumber(dateToCheck = new Date()):number {
        let d:any = new Date(dateToCheck);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart:any = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
    };

    isCurrentDay(day:number, dateToCheck):boolean {
        return day === dateToCheck.getDate();
    }

    isCurrentWeek(weekNumber:number, dateToCheck):boolean {
        return weekNumber === this.getWeekNumber(dateToCheck);
    }

    isCurrentMonth(month:number, dateToCheck):boolean {
        return month === (dateToCheck.getMonth() + 1);
    }

}
