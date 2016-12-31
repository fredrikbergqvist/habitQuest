/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HabitDataService } from './habit-data.service';

describe('HabitDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HabitDataService]
    });
  });

  it('should ...', inject([HabitDataService], (service: HabitDataService) => {
    expect(service).toBeTruthy();
  }));
});
