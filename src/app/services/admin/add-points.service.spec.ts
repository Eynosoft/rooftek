import { TestBed } from '@angular/core/testing';

import { AddPointsService } from './add-points.service';

describe('AddPointsService', () => {
  let service: AddPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
