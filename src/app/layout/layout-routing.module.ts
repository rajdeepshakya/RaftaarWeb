import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDashboardComponent } from '../business/business-pages/business-dashboard/business-dashboard/business-dashboard.component';
import { RouteConstant } from '../core/_constants/route.constant';
import { BusinessWrapperComponent } from './business-wrapper/business-wrapper.component';
import { WrapperComponent } from './wrapper/wrapper.component';

const routes: Routes = [
  {
    path:'main',
    component:WrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/pages/pages.module').then((v) => v.PagesModule),
      },
    ],
  },
  {
    path:'business',
    component:BusinessWrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../business/business-pages/business-pages.module').then((v) => v.BusinessPagesModule),
      }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
