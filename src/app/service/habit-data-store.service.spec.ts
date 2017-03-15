/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {HabitDataStoreService} from './habit-data-store.service';
import {DataStoreService} from './data-store.service';
import {DateService} from './date.service';

describe('HabitDataStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DateService, DataStoreService, HabitDataStoreService]
        });
    });

    it('should ...', inject([HabitDataStoreService], (service:HabitDataStoreService) => {
        expect(service).toBeTruthy();
    }));
});
