import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/_constants/guards/auth.guard';
import { RouteConstant } from 'src/app/core/_constants/route.constant';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard/business-dashboard.component';

const routes: Routes = [
  {
    path:RouteConstant.customers,
    loadChildren: ()=> import(`../business-pages/customers/customers.module`).then((m)=>m.CustomersModule),
    // canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.productCatalogue,
    loadChildren: ()=> import(`../business-pages/product-catalogue/product-catalogue.module`).then((m)=>m.ProductCatalogueModule),
    // canActivate: [AuthGuard]

  },
  {
    path:RouteConstant.salesorder,
    loadChildren:()=>import(`../business-pages/sales-orders/sales-orders.module`).then((m)=>m.SalesOrdersModule),
    // canActivate: [AuthGuard]

  },
  {
    path:RouteConstant.transactions,
    loadChildren:()=>import(`../business-pages/transactions/transactions.module`).then((m)=>m.TransactionsModule),
    // canActivate: [AuthGuard]

  },
  {
    path:RouteConstant.purchaseOrder,
    loadChildren:()=>import(`../business-pages/purchase-order/purchase-order.module`).then((m)=>m.PurchaseOrderModule),
    // canActivate: [AuthGuard]

  },
  {
    path: RouteConstant.businessDashboard,
    loadChildren:()=>import(`../business-pages/business-dashboard/business-dashboard.module`).then((m)=>m.BusinessDashboardModule),
    // canActivate: [AuthGuard]
  },
  
  {
    path:RouteConstant.activityLog,
    loadChildren:()=>import(`../business-pages/activity-log/activity-log.module`).then((m)=>m.ActivityLogModule),
    // canActivate: [AuthGuard]
  },
  {
    path:'**',
    redirectTo: RouteConstant.businessDashboard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessPagesRoutingModule { }
