import { TestBed } from '@angular/core/testing';

import { HttpPaymentService } from './http-payment.service';

describe('HttpPaymentService', () => {
  let service: HttpPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
