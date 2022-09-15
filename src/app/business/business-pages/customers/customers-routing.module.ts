import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { BlockedCustomersComponent } from './blocked-customers/blocked-customers.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { SellerComponent } from './seller/seller.component';

const routes: Routes = [
  {
    path:'',
    component:CustomersComponent,
    children: [
      {
        path:'buyer',
        component:BuyerComponent
      },
      {
        path: 'seller',
        component: SellerComponent
      },
      {
        path: '',
        redirectTo: 'buyer',
        // component: BuyerComponent,
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path:'buyer',
  //   component:BuyerComponent
  // },
  // {
  //   path: 'seller',
  //   component: SellerComponent
  // },
  {
    path:'customer-details',
    component:CustomerDetailComponent
  },
  {
    path:'payment-details',
    component:PaymentDetailsComponent
  },
  {
    path:'order-details',
    component:OrderDetailsComponent
  },
  {
    path:'add-client',
    component:AddClientComponent
  },
  {
    path:'edit-client',
    component:AddClientComponent
  },
  {
    path: 'blocked-customers',
    component: BlockedCustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
