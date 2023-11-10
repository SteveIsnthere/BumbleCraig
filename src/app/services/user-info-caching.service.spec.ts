import { TestBed } from '@angular/core/testing';

import { UserInfoCachingService } from './user-info-caching.service';

describe('UserInfoCachingService', () => {
  let service: UserInfoCachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoCachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
