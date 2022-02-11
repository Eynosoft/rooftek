import { TestBed } from '@angular/core/testing';

import { FranchiseManagerService } from './franchise-manager.service';

describe('FranchiseManagerService', () => {
  let service: FranchiseManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranchiseManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
