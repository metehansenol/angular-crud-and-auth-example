import { Component, OnInit } from '@angular/core';

import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styles: ['.buttons .btn { margin: 0 15px 15px 0 }']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAll()
      .subscribe(customers => this.customers = customers);
  }
}
