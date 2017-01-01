import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {HttpService} from './http.service';
import {HabitGroup} from '../models/habit-group';

@Injectable()
export class HabitDataService {
    habitGroups:Array<HabitGroup> = [];

    constructor(private http:HttpService) {}

    getHabits():Observable<Array<HabitGroup>>{
        return this.http.get("https://dl.dropboxusercontent.com/u/2132168/habit/habits.json")
            .map((habitList:{habitGroups:[any]}) => {
                if (habitList.habitGroups) {
                    habitList.habitGroups.forEach((h:HabitGroup) => {
                        this.habitGroups.push(h);
                    });
                }
                return this.habitGroups;
            });
    }
}
