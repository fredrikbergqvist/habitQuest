/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {UserDataService} from './user-data.service';
import {HabitUtilService} from './habit-util.service';
import {DateService} from './date.service';
import {HabitDataStoreService} from './habit-data-store.service';
import {UserDataStoreService} from './user-data-store.service';
import {DataStoreService} from './data-store.service';

describe('UserDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DataStoreService, UserDataStoreService, HabitDataStoreService, DateService, HabitUtilService, UserDataService]
        });
    });

    it('should ...', inject([UserDataService], (service:UserDataService) => {
        expect(service).toBeTruthy();
    }));
});
