import {Injectable} from '@angular/core';

@Injectable()
export class HabitUtilService {

    constructor() { }

    timesCompleted(habitId:number, completedHabits:Array<number>):number {
        return completedHabits.filter(h => h === habitId).length;
    }

    completedMaxTimes(completedHabits:Array<number> = [], max:number = 0, habitId:number = 0) {
        return completedHabits.filter((h) => h == habitId).length >= max;
    }

}
