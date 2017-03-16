/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {HabitUtilService} from './habit-util.service';
import {Habit} from '../models/habit';

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
            const result = service.timesCompleted(1000, []);
            expect(result).toBeFalsy();
        }));

        it('should return true if habit found ', inject([HabitUtilService], (service:HabitUtilService) => {
            let result = service.timesCompleted(1000, [1000]);
            expect(result).toBeTruthy();

            result = service.timesCompleted(1000, [2000, 1000, 2000]);
            expect(result).toBeTruthy();

            result = service.timesCompleted(1000, [1000, 1000, 1000]);
            expect(result).toBeTruthy();
        }));
    });

    describe('completedMaxTimes', () => {
        it('should return false if completed habits is empty', inject([HabitUtilService], (service:HabitUtilService) => {
            let result = service.completedMaxTimes([], 1, 1000);
            expect(result).toBeFalsy();
        }));

        it('should return false if completed habits are less then max', inject([HabitUtilService], (service:HabitUtilService) => {
            let result = service.completedMaxTimes([2000,3000], 1, 1000);
            expect(result).toBeFalsy();
        }));

        it('should return true if inputs are undefined', inject([HabitUtilService], (service:HabitUtilService) => {
            let result = service.completedMaxTimes();
            expect(result).toBeTruthy();
        }));

        it('should return true if completed habits = max ', inject([HabitUtilService], (service:HabitUtilService) => {
            let result = service.completedMaxTimes([1000], 1, 1000);
            expect(result).toBeTruthy();
            result = service.completedMaxTimes([2000, 1000, 2000], 1, 1000);
            expect(result).toBeTruthy();
        }));

        it('should return true if completed habits > max ', inject([HabitUtilService], (service:HabitUtilService) => {
            let result = service.completedMaxTimes([1000, 1000], 1, 1000);
            expect(result).toBeTruthy();
            result = service.completedMaxTimes([2000, 1000, 2000, 1000, 2000], 1, 1000);
            expect(result).toBeTruthy();
        }));
    });

});
