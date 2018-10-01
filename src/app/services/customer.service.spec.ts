import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppFakeBackendInterceptor, appFakeBackendProvider } from '../app.fakebackend';

import { CustomerService } from './customer.service';
import { Customer } from '../models/customer.model';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        CustomerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppFakeBackendInterceptor,
          multi: true,
        },
        appFakeBackendProvider
      ]
    });
  });

  it('when call getAll method should get all customers', async(() => {
    service = TestBed.get(CustomerService);
    service.getAll().subscribe((customers: Customer[]) => {
      expect(customers.length).toBeGreaterThanOrEqual(5);
    });
  }));

  it('when call getById(3) method should get same customerID', async(() => {
    service = TestBed.get(CustomerService);
    service.getById(3).subscribe((customer: Customer) => {
      expect(customer.customerID).toBe(3);
    });
  }));
});
