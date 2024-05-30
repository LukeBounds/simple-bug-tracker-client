import { TestBed } from '@angular/core/testing';

import { SerialiseService } from './serialise.service';

describe('SerialiseService', () => {
  let service: SerialiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerialiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
