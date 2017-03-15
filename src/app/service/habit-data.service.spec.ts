/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {HabitDataService} from './habit-data.service';
import {HttpService} from './http.service';
import {Http, HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('HabitDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [{ provide: XHRBackend, useClass: MockBackend },  HttpService, HabitDataService]
        });
    });

    it('should ...', inject([HabitDataService], (service:HabitDataService) => {
        expect(service).toBeTruthy();
    }));
});
