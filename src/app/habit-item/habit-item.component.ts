import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {Habit} from '../models/habit';
import {UserDataService} from '../service/user-data.service';
import {DateService} from '../service/date.service';

@Component({
    selector:    'app-habit-item',
    templateUrl: './habit-item.component.html'
})
export class HabitItemComponent implements OnInit {
    @Input() habit: Habit;

    private completedDailyCount:number;
    private completedWeeklyCount:number;
    private completedMonthlyCount:number;

    constructor(private userDataService:UserDataService,private dateService: DateService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.checkCounts();
        this.dateService.getSelectedDate().subscribe(() => {
            this.cd.markForCheck();
            this.checkCounts();
        });
    }

    checkCounts(){
        this.completedDailyCount = this.userDataService.timesCompletedToday(this.habit);
        this.completedWeeklyCount = this.userDataService.timesCompletedThisWeek(this.habit);
        this.completedMonthlyCount = this.userDataService.timesCompletedThisMonth(this.habit);
    }

    addHabit():void{
        this.userDataService.addHabit(this.habit);
        this.checkCounts();
    }

    removeHabit():void{
        this.userDataService.removeHabit(this.habit);
        this.checkCounts();
    }

    hasCompleted():boolean{
        return this.userDataService.hasCompletedMaxTimes(this.habit);
    }
}
