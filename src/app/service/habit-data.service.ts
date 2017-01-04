import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {HttpService} from './http.service';
import {HabitGroup} from '../models/habit-group';
import {DataStoreService} from './data-store.service';

@Injectable()
export class HabitDataService {
    habitGroups:Array<HabitGroup> = [];

    constructor(private http:HttpService, private dataStoreService:DataStoreService) {}

    getHabits():Observable<Array<HabitGroup>>{
        return this.http.get("/assets/json/habits.json", null, (r) => this.saveHabitsOffline(r))
            .map((habitList:{habitGroups:[any]}) => {
                if (habitList.habitGroups) {
                    habitList.habitGroups.forEach((h:HabitGroup) => {
                        this.habitGroups.push(h);
                    });
                }
                return this.habitGroups;
            });
    }

    saveHabitsOffline(response){

        this.dataStoreService.saveData('offlineHabits', JSON.stringify(response.json()));
    }
}
