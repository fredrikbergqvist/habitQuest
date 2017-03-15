/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDataStoreService } from './user-data-store.service';

describe('UserDataStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataStoreService]
    });
  });

  it('should ...', inject([UserDataStoreService], (service: UserDataStoreService) => {
    expect(service).toBeTruthy();
  }));
});