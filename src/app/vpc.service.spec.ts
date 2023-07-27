import { TestBed } from '@angular/core/testing';

import { VpcService } from './vpc.service';

describe('VpcService', () => {
  let service: VpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
