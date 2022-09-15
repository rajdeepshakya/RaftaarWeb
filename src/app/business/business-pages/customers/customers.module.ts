import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { BuyerComponent } from './buyer/buyer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddClientComponent } from './add-client/add-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerComponent } from './seller/seller.component';
import { BlockedCustomersComponent } from './blocked-customers/blocked-customers.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    CustomersComponent,
    BuyerComponent,
    CustomerDetailComponent,
    PaymentDetailsComponent,
    OrderDetailsComponent,
    AddClientComponent,
    SellerComponent,
    BlockedCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ]
})
export class CustomersModule { }
