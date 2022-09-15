import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewSalesOrderComponent } from './add-new-sales-order/add-new-sales-order.component';
import { OrderDetailAcceptComponent } from './order-detail-accept/order-detail-accept.component';
import { OrderDetailsEditComponent } from './order-details-edit/order-details-edit.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';

const routes: Routes = [
  {
    path: '',
    component:SalesOrderComponent
  },
  {
    path: 'add-new-sales-order',
    component:AddNewSalesOrderComponent
  },
  {
    path: 'edit-sales-order',
    component: AddNewSalesOrderComponent
  },
  // {
  //   path:'order-details',
  //   component:OrderDetailsComponent
  // },
  {
    path: 'purchase-order',
    component: SalesOrderComponent
  },
  {
    path: 'order-detail-edit',
    component: OrderDetailsEditComponent
  },
  {
    path: 'order-detail-accept',
    component: OrderDetailAcceptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrdersRoutingModule { }
