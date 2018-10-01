import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomerService } from './services/customer.service';
import { AppFakeBackendInterceptor, appFakeBackendProvider } from './app.fakebackend';

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
