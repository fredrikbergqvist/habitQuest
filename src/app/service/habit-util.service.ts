import { Injectable } from '@angular/core';
import {Habit} from '../models/habit';
import {IHabitData} from '../interface/i-habit-data';

@Injectable()
export class HabitUtilService {

  constructor() { }

    timesCompleted(habit:Habit, completedHabits:IHabitData):number {
        return completedHabits.habits.filter(h => h === habit.id).length;
    }

}
