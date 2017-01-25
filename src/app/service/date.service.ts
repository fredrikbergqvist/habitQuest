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

    getSelectedDate():any{
        return this.dateObservable;
    }

    setSelectedDate(selectedDate:any){
        this.selectedDate = selectedDate;
        this.dateObservable.next(this.selectedDate);
    }

    getWeekNumber(): number {
        let d: any = new Date(this.selectedDate);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart: any = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
    };

    isCurrentDay(day:number):boolean{
        return day === this.selectedDate.getDate();
    }

    isCurrentWeek(weekNumber:number):boolean{
        return weekNumber === this.getWeekNumber();
    }

    isCurrentMonth(month:number):boolean{
        return month === (this.selectedDate.getMonth() + 1);
    }

}
