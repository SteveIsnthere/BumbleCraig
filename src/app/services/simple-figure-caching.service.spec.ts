import { TestBed } from '@angular/core/testing';

import { SimpleFigureCachingService } from './simple-figure-caching.service';

describe('SimpleFigureCachingService', () => {
  let service: SimpleFigureCachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleFigureCachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
