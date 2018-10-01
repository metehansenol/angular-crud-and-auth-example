import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppFakeBackendInterceptor, appFakeBackendProvider } from '../app.fakebackend';
import { RouterTestingModule } from '@angular/router/testing';

import * as moment from 'moment';

import { CustomerCreateComponent } from './customer-create.component';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

describe('CustomerCreateComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerCreateComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
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
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CustomerCreateComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('when create method called should new customer object added', async(() => {
    const fixture = TestBed.createComponent(CustomerCreateComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    component.firstName = 'test';
    component.lastName = 'test';
    component.birthday = moment().format("DD.MM.YYYY");
    component.gender = 'm';
    component.lastContact = moment().format("DD.MM.YYYY HH:mm:ss");
    component.lifetimeValue = 512.64;
    component.create();
    const customerService = TestBed.get(CustomerService) as CustomerService;
    customerService.getAll().subscribe((customers: Customer[]) => {
      expect(customers.length).toBeGreaterThanOrEqual(6);
    });
  }));
});
