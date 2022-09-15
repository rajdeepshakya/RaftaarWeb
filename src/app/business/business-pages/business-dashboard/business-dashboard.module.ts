import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessDashboardRoutingModule } from './business-dashboard-routing.module';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { PagesModule } from 'src/app/modules/pages/pages.module';
import { TemplatesModule } from 'src/app/shared/templates/templates.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    BusinessDashboardComponent
  ],
  imports: [
    CommonModule,
    BusinessDashboardRoutingModule,
    TemplatesModule,
    TransactionsModule,
    LayoutModule,MatSelectModule,
  ]
})
export class BusinessDashboardModule { }
