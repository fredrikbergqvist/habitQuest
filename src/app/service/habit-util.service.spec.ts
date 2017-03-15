/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {HabitUtilService} from './habit-util.service';

describe('HabitUtilService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HabitUtilService]
        });
    });

    it('should exist', inject([HabitUtilService], (service:HabitUtilService) => {
        expect(service).toBeTruthy();
    }));
    it('should exist', inject([HabitUtilService], (service:HabitUtilService) => {
        expect(service).toBeTruthy();
    }));
});
