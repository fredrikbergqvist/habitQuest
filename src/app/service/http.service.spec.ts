/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {HttpService} from './http.service';
import { XHRBackend, HttpModule} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('HttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [{ provide: XHRBackend, useClass: MockBackend }, HttpService]
        });
    });

    it('should ...', inject([HttpService], (service:HttpService) => {
        expect(service).toBeTruthy();
    }));
});
