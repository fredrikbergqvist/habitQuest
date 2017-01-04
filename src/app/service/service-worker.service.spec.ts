/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceWorkerService } from './service-worker.service';

describe('ServiceWorkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceWorkerService]
    });
  });

  it('should ...', inject([ServiceWorkerService], (service: ServiceWorkerService) => {
    expect(service).toBeTruthy();
  }));
});
