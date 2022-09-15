import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { PurchaseOrderAcceptComponent } from './purchase-order-accept/purchase-order-accept.component';
import { SalesOrdersModule } from '../sales-orders/sales-orders.module';
import { AddNewPurchaseOrderComponent } from './add-new-purchase-order/add-new-purchase-order.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AddPurchaseOrderComponent,
    PurchaseOrderAcceptComponent,
    AddNewPurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    LayoutModule,
    SalesOrdersModule,
    MatSelectModule,
    MatFormFieldModule,
    CarouselModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  
})
export class PurchaseOrderModule { }
