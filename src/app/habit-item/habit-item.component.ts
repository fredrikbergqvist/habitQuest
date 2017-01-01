import {Component, OnInit, Input} from '@angular/core';
import {Habit} from '../models/habit';
import {UserDataService} from '../service/user-data.service';

@Component({
    selector:    'app-habit-item',
    templateUrl: './habit-item.component.html'
})
export class HabitItemComponent implements OnInit {
    @Input() habit: Habit;

    constructor(private userDataService:UserDataService) {}

    ngOnInit() {}

    addHabit():void{
        this.userDataService.addHabit(this.habit);
    }

    hasCompleted():boolean{
        return this.userDataService.hasCompletedMaxTimes(this.habit);
    }

    completedDailyCount(){
        return this.userDataService.timesCompletedToday(this.habit);
    }
    completedWeeklyCount(){
        return this.userDataService.timesCompletedThisWeek(this.habit);
    }
    completedMonthlyCount(){
        return this.userDataService.timesCompletedThisMonth(this.habit);
    }
}
