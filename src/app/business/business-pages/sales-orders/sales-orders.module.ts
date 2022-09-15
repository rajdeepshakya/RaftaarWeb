import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrdersRoutingModule } from './sales-orders-routing.module';
import { AddNewSalesOrderComponent } from './add-new-sales-order/add-new-sales-order.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { OrderDetailsEditComponent } from './order-details-edit/order-details-edit.component';
import { OrderDetailAcceptComponent } from './order-detail-accept/order-detail-accept.component';
import { AddNewPurchaseOrderComponent } from '../purchase-order/add-new-purchase-order/add-new-purchase-order.component';
import { AddNewFeaturedProductComponent } from 'src/app/modules/pages/add-new-feature/add-new-featured-product/add-new-featured-product.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [
        AddNewSalesOrderComponent,
        SalesOrderComponent,
        OrderDetailsComponent,
        PurchaseOrderComponent,
        OrderDetailsEditComponent,
        OrderDetailAcceptComponent,
    ],
    imports: [
        CommonModule,
        SalesOrdersRoutingModule,
        LayoutModule,
        MatSelectModule,
        MatFormFieldModule,
        CarouselModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,MatCardModule
    ],
    exports: [OrderDetailsComponent, AddNewSalesOrderComponent]
})
export class SalesOrdersModule { }
