import {Component, OnInit} from '@angular/core';
import {HabitDataService} from './service/habit-data.service';
import {HabitGroup} from './models/habit-group';
import {UserDataService} from './service/user-data.service';
import {User} from './models/user';
import {WindowVisibilityService} from './service/window-visibility.service';
import {ServiceWorkerService} from './service/service-worker.service';

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {
    habitGroups: Array<HabitGroup> = [];
    userData: User;
    selectedDate:any = new Date();

    constructor(private habitDataService: HabitDataService,
                private userDataService: UserDataService,
                private visibilityService: WindowVisibilityService,
                private serviceWorkerService:ServiceWorkerService) {
    }

    public ngOnInit(): void {
        this.serviceWorkerService.register();
        this.visibilityService.monitorVisibility();
        this.visibilityService.register(()=>this.initialize());
        this.initialize();
    }

    private initialize(){
        this.habitDataService.getHabits().subscribe((hl: Array<HabitGroup>) => this.habitGroups = hl);
        this.userData = this.userDataService.loadUser();

    }

    onRegister(user: User) {
        this.userData = user;
        this.userDataService.saveUser(user);
    }

    dateChanged(newDate){
        this.userDataService.handleSelectedDateChange(newDate);
        this.selectedDate = new Date(newDate); // Create a new object to trigger update
    }
}
