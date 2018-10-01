import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppFakeBackendInterceptor, appFakeBackendProvider } from '../app.fakebackend';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../services/customer.service';

describe('CustomerListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerListComponent
      ],
      imports: [
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
    const fixture = TestBed.createComponent(CustomerListComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it(`should have customers to be fill`, async(() => {
    const fixture = TestBed.createComponent(CustomerListComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component.customers).not.toBeNull();
    expect(component.customers.length).toBeGreaterThanOrEqual(5);
  }));
});
