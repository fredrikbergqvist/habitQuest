/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowVisibilityService } from './window-visibility.service';
import {WindowService} from './window.service';

describe('WindowVisibilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowService, WindowVisibilityService]
    });
  });

  it('should ...', inject([WindowVisibilityService], (service: WindowVisibilityService) => {
    expect(service).toBeTruthy();
  }));
});
