/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowVisibilityService } from './window-visibility.service';

describe('WindowVisibilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowVisibilityService]
    });
  });

  it('should ...', inject([WindowVisibilityService], (service: WindowVisibilityService) => {
    expect(service).toBeTruthy();
  }));
});
