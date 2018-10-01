import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/mergeMap';

import * as moment from 'moment';

import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { Name } from '../models/name.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styles: ['.errmsg { margin-top: 15px } .buttons .btn { width: 100px; margin-right: 15px }']
})
export class CustomerDetailComponent implements OnInit {
  hasError: boolean;
  errorMessage: string;

  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  lastContact: string;
  lifetimeValue: string;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  save() {
    this.hasError = false;
    this.errorMessage = "";

    let moBirthday = moment(this.birthday, "DD.MM.YYYY", true);
    if (!moBirthday.isValid()) {
      this.errorMessage = "Birthday is not a valid date!";
      this.hasError = true;
      return;
    }

    let moLastContact = moment(this.lastContact, "DD.MM.YYYY HH:mm:ss", true);
    if (!moLastContact.isValid()) {
      this.errorMessage = "Last Contact is not a valid datetime!";
      this.hasError = true;
      return;
    }

    let lifetimeValueNum = Number(this.lifetimeValue);
    if (isNaN(lifetimeValueNum)) {
      this.errorMessage = "Customer Lifetime Value is not a valid number!";
      this.hasError = true;
      return;
    }

    let customer = new Customer();
    customer.customerID = this.id;
    customer.name = new Name();
    customer.name.first = this.firstName;
    customer.name.last = this.lastName;
    customer.birthday = moBirthday.toDate();
    customer.gender = this.gender;
    customer.lastContact = moLastContact.toDate();
    customer.customerLifetimeValue = lifetimeValueNum;

    this.customerService.update(customer)
      .subscribe(() => this.router.navigateByUrl('/'));
  }

  delete() {
    this.route.params.mergeMap(routeParams => this.customerService.delete(routeParams.id))
      .subscribe(() => this.router.navigateByUrl('/'));
  }

  ngOnInit() {
    this.route.params.mergeMap(routeParams => this.customerService.getById(routeParams.id))
      .subscribe(customer => {
        this.id = customer.customerID;
        this.firstName = customer.name.first;
        this.lastName = customer.name.last;
        this.birthday = moment(customer.birthday).format("DD.MM.YYYY");
        this.gender = customer.gender;
        this.lastContact = moment(customer.lastContact).format("DD.MM.YYYY HH:mm:ss");
        this.lifetimeValue = customer.customerLifetimeValue.toString();
      });
  }
}
