import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPurchaseOrderComponent } from './add-new-purchase-order/add-new-purchase-order.component';
import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';
import { PurchaseOrderAcceptComponent } from './purchase-order-accept/purchase-order-accept.component';

const routes: Routes = [
  {
    path:'',
    component:AddPurchaseOrderComponent
  },
  {
    path: 'purchaseOrder',
    component: AddPurchaseOrderComponent
  },
  {
    path:'purchase-order-accept',
    component:PurchaseOrderAcceptComponent
  },
  {
    path:'add-purchase-order',
    component: AddNewPurchaseOrderComponent
  },
  {
    path: 'edit-purchase-order',
    component: AddNewPurchaseOrderComponent
  },
  // {
  //   path: 'purchase-order/add-purchase-order',
  //   component:AddNewPurchaseOrderComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
