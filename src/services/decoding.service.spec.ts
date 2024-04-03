import { TestBed } from '@angular/core/testing';

import { DecodingService } from './decoding.service';

describe('DecodingService', () => {
  let service: DecodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
