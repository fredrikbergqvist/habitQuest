import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Habit} from '../models/habit';
import {UserDataService} from '../service/user-data.service';

@Component({
    selector:    'app-habit-item',
    templateUrl: './habit-item.component.html'
})
export class HabitItemComponent implements OnInit, OnChanges {
    @Input() habit:Habit;
    @Input() selectedDate:any;

    private completedDailyCount:number = 0;
    private completedWeeklyCount:number = 0;
    private completedMonthlyCount:number = 0;

    constructor(private userDataService:UserDataService) {}

    ngOnInit() {
        this.checkCounts();
    }

    ngOnChanges(changes:SimpleChanges):void {
        this.checkCounts();
    }

    checkCounts() {
        this.completedDailyCount = this.userDataService.timesCompletedToday(this.habit);
        this.completedWeeklyCount = this.userDataService.timesCompletedThisWeek(this.habit);
        this.completedMonthlyCount = this.userDataService.timesCompletedThisMonth(this.habit);
    }

    addHabit():void {
        this.userDataService.addHabit(this.habit, this.selectedDate);
        this.checkCounts();
    }

    removeHabit():void {
        this.userDataService.removeHabit(this.habit, this.selectedDate);
        this.checkCounts();
    }

    hasCompleted():boolean {
        return this.userDataService.hasCompletedMaxTimes(this.habit, this.selectedDate);
    }

    maxedForToday():boolean{
        if(!this.habit){
            return;
        }
        return this.completedDailyCount < this.habit.maxDay
    }
}
