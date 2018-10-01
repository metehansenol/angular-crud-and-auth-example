import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppFakeBackendInterceptor, appFakeBackendProvider } from '../app.fakebackend';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

describe('CustomerDetailComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerDetailComponent
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
        appFakeBackendProvider,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 3 })
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CustomerDetailComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should have same id with provided ActivatedRouteParam', async(() => {
    const fixture = TestBed.createComponent(CustomerDetailComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component.id).toBe(3);
  }));

  it('when save method called should customer object updated', async(() => {
    const fixture = TestBed.createComponent(CustomerDetailComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    component.firstName = 'test';
    component.save();
    const customerService = TestBed.get(CustomerService) as CustomerService;
    customerService.getById(3).subscribe((customer: Customer) => {
      expect(customer.name.first).toBe('test');
    });
  }));
});
