import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styles: ['.errmsg { margin-top: 15px } .buttons .btn { width: 100px; margin-right: 15px }']
})
export class CustomerCreateComponent implements OnInit {
  hasError: boolean;
  errorMessage: string;

  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  lastContact: string;
  lifetimeValue: string;

  constructor(
    private customerService: CustomerService,
    private router: Router) { }

  create() {
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

    this.customerService.create(
      this.firstName,
      this.lastName,
      moBirthday.toDate(),
      this.gender,
      moLastContact.toDate(),
      lifetimeValueNum
    ).subscribe(() => this.router.navigateByUrl('/'));
  }

  ngOnInit() {
    this.birthday = moment().format("DD.MM.YYYY");
    this.lastContact = moment().format("DD.MM.YYYY HH:mm:ss");
  }
}
