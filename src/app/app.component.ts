import {Component, OnInit} from '@angular/core';
import {HabitDataService} from './service/habit-data.service';
import {HabitGroup} from './models/habit-group';

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'HabitQuest';
    habitGroups:Array<HabitGroup> = [];

    constructor(private habitDataService:HabitDataService) {}

    public ngOnInit(): void {
        this.habitDataService.getHabits().subscribe((hl:Array<HabitGroup>) => {console.log(hl);this.habitGroups = hl;});
    }
}
