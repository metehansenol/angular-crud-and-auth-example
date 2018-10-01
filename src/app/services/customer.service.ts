import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {
  private customerApiUrl = 'http://localhost:4200/api/customers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get(this.customerApiUrl)
      .map(response => response as Customer[]);
  }

  getById(id: number): Observable<Customer> {
    const url = `${this.customerApiUrl}/${id}`;
    return this.http.get(url)
      .map(response => response as Customer);
  }

  create(firstName: string, lastName: string, birthday: Date, gender: string, lastContact: Date, customerLifetimeValue: Number): Observable<Customer> {
    return this.http.post(this.customerApiUrl, JSON.stringify({
      name: {
        first: firstName,
        last: lastName
      },
      birthday: birthday,
      gender: gender,
      lastContact: lastContact,
      customerLifetimeValue: customerLifetimeValue
    })).map(response => response as Customer);
  }

  update(customer: Customer): Observable<Customer> {
    const url = `${this.customerApiUrl}/${customer.customerID}`;
    return this.http.put(url, JSON.stringify(customer))
      .map(response => response as Customer);
  }

  delete(id: number): Observable<any> {
    const url = `${this.customerApiUrl}/${id}`;
    return this.http.delete(url);
  }
}
