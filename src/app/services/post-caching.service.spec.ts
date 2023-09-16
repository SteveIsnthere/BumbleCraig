import { TestBed } from '@angular/core/testing';

import { PostCachingService } from './post-caching.service';

describe('PostCachingService', () => {
  let service: PostCachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
