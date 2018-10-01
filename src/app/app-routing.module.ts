import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './customers/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail.component';
import { CustomerCreateComponent } from './customers/customer-create.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'create-customer', component: CustomerCreateComponent },
  { path: 'customers/:id', component: CustomerDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
