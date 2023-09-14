import { TestBed } from '@angular/core/testing';

import { GroupBasicInfoCachingService } from './group-basic-info-caching.service';

describe('GroupBasicInfoCachingService', () => {
  let service: GroupBasicInfoCachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupBasicInfoCachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
