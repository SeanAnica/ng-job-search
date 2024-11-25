import { TestBed } from '@angular/core/testing';

import { FavoriteJobService } from './favorite-job.service';

describe('FavoriteJobService', () => {
  let service: FavoriteJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
