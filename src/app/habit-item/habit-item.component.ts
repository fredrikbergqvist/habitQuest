import {Component, OnInit, Input} from '@angular/core';
import {Habit} from '../models/habit';
import {UserDataService} from '../service/user-data.service';

@Component({
    selector:    'app-habit-item',
    templateUrl: './habit-item.component.html',
    styleUrls:   ['./habit-item.component.scss']
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

}
