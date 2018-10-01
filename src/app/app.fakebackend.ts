import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

import 'rxjs/add/operator/map';

import { Customer } from './models/customer.model'
import { Name } from './models/name.model'

@Injectable()
export class AppFakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let customers: any[] = JSON.parse(localStorage.getItem('customers')) || [];

    if (customers.length === 0) {
      customers = [
        {
          "customerID": 1,
          "name": {
            "first": "Peter",
            "last": "Smith"
          },
          "birthday": "1996-10-12",
          "gender": "m",
          "lastContact": "2017-06-01T23:28:56.782Z",
          "customerLifetimeValue": 191.12
        },
        {
          "customerID": 2,
          "name": {
            "first": "Anna",
            "last": "Hopp"
          },
          "birthday": "1987-05-03",
          "gender": "w",
          "lastContact": "2017-07-08T13:18:56.888Z",
          "customerLifetimeValue": 50.99
        },
        {
          "customerID": 3,
          "name": {
            "first": "Christian",
            "last": "Cox"
          },
          "birthday": "1991-02-21",
          "gender": "m",
          "lastContact": "2017-08-01T11:57:47.142Z",
          "customerLifetimeValue": 0
        },
        {
          "customerID": 4,
          "name": {
            "first": "Roxy",
            "last": "Fox"
          },
          "birthday": "1979-06-30",
          "gender": "w",
          "lastContact": "2017-01-29T21:08:50.700Z",
          "customerLifetimeValue": 213.12
        },
        {
          "customerID": 5,
          "name": {
            "first": "Eric",
            "last": "Adam"
          },
          "birthday": "1969-11-21",
          "gender": "m",
          "lastContact": "2017-03-18T12:20:06.702Z",
          "customerLifetimeValue": 1019.91
        }
      ];

      localStorage.setItem('customers', JSON.stringify(customers));
    }

    // get all customers
    if (request.url.endsWith('/api/customers') && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: customers }));
    }

    // get customer by id
    if (request.url.match(/\/api\/customers\/\d+$/) && request.method === 'GET') {
      // find customer by id in customers array
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1], 10);
      const matchedCustomers = customers.filter(c => c.customerID === id);
      const customer = matchedCustomers.length ? matchedCustomers[0] : null;

      // respond 200 OK
      return of(new HttpResponse({ status: 200, body: customer }));
    }

    // create customer
    if (request.url.endsWith('/api/customers') && request.method === 'POST') {
      // get new customer object from post body
      const newCustomer = JSON.parse(request.body) as Customer;

      // save new customer
      newCustomer.customerID = customers.length + 1;
      customers.push(newCustomer);
      localStorage.setItem('customers', JSON.stringify(customers));

      // respond 201 Created
      return of(new HttpResponse({ status: 201, body: newCustomer }));
    }

    // update customer
    if (request.url.match(/\/api\/customers\/\d+$/) && request.method === 'PUT') {
      // get customer object from post body
      const sourceCustomer = JSON.parse(request.body) as Customer;

      // find target customer by id in customers array
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1], 10);
      const matchedCustomers = customers.filter(c => c.customerID === id);
      const targetCustomer = matchedCustomers.length ? matchedCustomers[0] : null;

      // update target customer
      let customerName = new Name();
      customerName.first = sourceCustomer.name.first;
      customerName.last = sourceCustomer.name.last;
      targetCustomer.name = customerName;
      targetCustomer.birthday = sourceCustomer.birthday;
      targetCustomer.gender = sourceCustomer.gender;
      targetCustomer.lastContact = sourceCustomer.lastContact;
      targetCustomer.customerLifetimeValue = sourceCustomer.customerLifetimeValue;

      localStorage.setItem('customers', JSON.stringify(customers));

      // respond 200 OK with updated customer
      return of(new HttpResponse({ status: 200, body: targetCustomer }));
    }

    // delete customer
    if (request.url.match(/\/api\/customers\/\d+$/) && request.method === 'DELETE') {
      // find customer by id in customers array
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1], 10);

      for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        if (customer.customerID === id) {
          // delete customer
          customers.splice(i, 1);
          localStorage.setItem('customers', JSON.stringify(customers));
          break;
        }
      }

      // respond 200 OK
      return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(request);
  }
}

export let appFakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppFakeBackendInterceptor,
  multi: true
};
