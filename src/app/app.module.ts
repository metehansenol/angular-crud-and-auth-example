import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomerService } from './services/customer.service';
import { AppFakeBackendInterceptor, appFakeBackendProvider } from './app.fakebackend';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';

import { CustomerListComponent } from './customers/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail.component';
import { CustomerCreateComponent } from './customers/customer-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule /*this should be last*/
  ],
  providers: [
    CustomerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppFakeBackendInterceptor,
      multi: true,
    },
    appFakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
