/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HabitDataStoreService } from './habit-data-store.service';

describe('HabitDataStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HabitDataStoreService]
    });
  });

  it('should ...', inject([HabitDataStoreService], (service: HabitDataStoreService) => {
    expect(service).toBeTruthy();
  }));
});
