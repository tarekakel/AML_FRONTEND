import { TestBed } from '@angular/core/testing';

import { AmlCustomerService } from './aml-customer.service';

describe('AmlCustomerService', () => {
  let service: AmlCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmlCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
