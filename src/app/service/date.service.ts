import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class DateService {
    public selectedDate;
    private dateObservable;

    constructor() {
        this.selectedDate = new Date();
        this.dateObservable = new ReplaySubject(1);
        this.dateObservable.next(this.selectedDate)
    }

    getWeekNumber(dateToCheck = new Date(this.selectedDate)):number {
        let d:any = dateToCheck;
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart:any = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
    };

    isCurrentDay(day:number, dateToCheck = this.selectedDate):boolean {
        return day === dateToCheck.getDate();
    }

    isCurrentWeek(weekNumber:number, dateToCheck = this.selectedDate):boolean {
        return weekNumber === this.getWeekNumber(dateToCheck);
    }

    isCurrentMonth(month:number, dateToCheck = this.selectedDate):boolean {
        return month === (dateToCheck.getMonth() + 1);
    }

}
