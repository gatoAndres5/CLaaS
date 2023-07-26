import { TestBed } from '@angular/core/testing';

import { VMImagesService } from './vmimages.service';

describe('VMImagesService', () => {
  let service: VMImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VMImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
