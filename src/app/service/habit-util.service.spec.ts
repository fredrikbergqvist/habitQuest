/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {HabitUtilService} from './habit-util.service';
import {Habit} from '../models/habit';
import {IHabitData} from '../interface/i-habit-data';

let habit:Habit = {
    "id": 1000,
    "name": "name",
    "note": "note",
    "reward": 1,
    "maxDay": 1,
    "maxWeek": 5,
    "maxMonth": 0,
    "goodHabit": true,
    "active" : true
};

let completedHabits;

describe('HabitUtilService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HabitUtilService]
        });
        completedHabits = {
            date: new Date(),
            habits: []
        };
    });

    it('should exist', inject([HabitUtilService], (service:HabitUtilService) => {
        expect(service).toBeTruthy();
    }));


    describe('timesCompleted', () => {
        it('should return false if no habit found', inject([HabitUtilService], (service:HabitUtilService) => {
            const result = service.timesCompleted(habit, completedHabits);
            expect(result).toBeFalsy();
        }));

        it('should return true if habit found ', inject([HabitUtilService], (service:HabitUtilService) => {
            completedHabits.habits = [1000];
            let result = service.timesCompleted(habit, completedHabits);
            expect(result).toBeTruthy();

            completedHabits.habits = [2000, 1000, 2000];
            result = service.timesCompleted(habit, completedHabits);
            expect(result).toBeTruthy();

            completedHabits.habits = [1000, 1000, 1000];
            result = service.timesCompleted(habit, completedHabits);
            expect(result).toBeTruthy();
        }));
    });

});
