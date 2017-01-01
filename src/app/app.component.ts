import {Component, OnInit} from '@angular/core';
import {HabitDataService} from './service/habit-data.service';
import {HabitGroup} from './models/habit-group';
import {UserDataService} from './service/user-data.service';
import {User} from './models/user';

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {
    habitGroups:Array<HabitGroup> = [];
    userData:User;

    constructor(private habitDataService:HabitDataService, private userDataService:UserDataService) {}

    public ngOnInit(): void {
        this.habitDataService.getHabits().subscribe((hl:Array<HabitGroup>) => this.habitGroups = hl);
        this.userData = this.userDataService.loadUser();
    }

    onRegister(user:User){
        this.userData = user;
        this.userDataService.saveUser(user);
    }
}
