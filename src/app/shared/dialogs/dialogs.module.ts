import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogsRoutingModule } from './dialogs-routing.module';
import { EditPopupComponent } from './edit-popup/edit-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPostComponent } from './add-post/add-post.component';
import { PostPublishComponent } from './post-publish/post-publish.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InterestedComponent } from './interested/interested.component';
import { ShareTestimonialComponent } from './share-testimonial/share-testimonial.component';
import { AddNewComponent } from './add-new/add-new.component';
import { DetailsComponent } from './details/details.component';
import { SalesFilterComponent } from './sales-filter/sales-filter.component';
import { RejectComponent } from './reject/reject.component';
import { AddManufactureProductComponent } from './add-manufacture-product/add-manufacture-product.component';
import { ReadyDispatchComponent } from './ready-dispatch/ready-dispatch.component';
import { DelayComponent } from './delay/delay.component';
import { OrderDispatchComponent } from './order-dispatch/order-dispatch.component';
import { PaymentPayerComponent } from './payment-payer/payment-payer.component';
import { CreditDebitComponent } from './credit-debit/credit-debit.component';
import { BoostComponent } from './boost/boost.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeRoutingModule } from 'src/app/modules/pages/home/home-routing.module';
import { DeleteComponent } from './delete/delete.component';
import { EditMobileComponent } from './edit-mobile/edit-mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { ExternalShareComponent } from './external-share/external-share.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareModule } from 'ngx-sharebuttons';
import { AddpostComponent } from './addpost/addpost.component';
import { ReportComponent } from './report/report.component';
import { MachineSellComponent } from './machine-sell/machine-sell.component';
import { RejectionReasionComponent } from './rejection-reasion/rejection-reasion.component';
import { AddSalesManufactureProductComponent } from './add-sales-manufacture-product/add-sales-manufacture-product.component';
import { AddSalesDeliveryMilestoneComponent } from './add-sales-delivery-milestone/add-sales-delivery-milestone.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { RejectPurchaseOrderComponent } from './reject-purchase-order/reject-purchase-order.component';
import { AddPurchaseManufactureMilestoneComponent } from './add-purchase-manufacture-milestone/add-purchase-manufacture-milestone.component';
import { AddPurchaseDeliveryMilestoneComponent } from './add-purchase-delivery-milestone/add-purchase-delivery-milestone.component';

@NgModule({
  declarations: [
    AddPostComponent,
    PostPublishComponent,
    AddFieldComponent,
    FilterProductComponent,
    InterestedComponent,
    AddNewComponent,
    DetailsComponent,
    SalesFilterComponent,
    RejectComponent,
    AddManufactureProductComponent,
    ReadyDispatchComponent,
    DelayComponent,
    OrderDispatchComponent,
    PaymentPayerComponent,
    CreditDebitComponent,
    BoostComponent,
    LogoutComponent,
    DeleteComponent,
    EditMobileComponent,
    EditEmailComponent,
    ExternalShareComponent,
    AddpostComponent,
    ReportComponent,
    MachineSellComponent,
    RejectionReasionComponent,
    AddSalesManufactureProductComponent,
    AddSalesDeliveryMilestoneComponent,
    ViewImageComponent,
    RejectPurchaseOrderComponent,
    AddPurchaseManufactureMilestoneComponent,
    AddPurchaseDeliveryMilestoneComponent
  ],
  imports: [
    CommonModule,
    DialogsRoutingModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    FontAwesomeModule,
    ShareModule
  ],
  exports: [EditPopupComponent,MatDialogModule,AddPostComponent,PostPublishComponent,
    AddFieldComponent,FilterProductComponent,InterestedComponent,ShareTestimonialComponent,ReportComponent,
  SalesFilterComponent,RejectComponent,RejectionReasionComponent ,BoostComponent, DeleteComponent
  ,EditMobileComponent,ExternalShareComponent,AddpostComponent,AddSalesManufactureProductComponent
  ,EditMobileComponent,ExternalShareComponent,AddpostComponent,ViewImageComponent],
  entryComponents:[
    EditPopupComponent,AddPostComponent,PostPublishComponent,AddFieldComponent,
    FilterProductComponent,InterestedComponent,ShareTestimonialComponent,SalesFilterComponent,RejectComponent, RejectionReasionComponent, DeleteComponent,RejectionReasionComponent,
    EditMobileComponent,ExternalShareComponent,AddSalesManufactureProductComponent,AddSalesDeliveryMilestoneComponent,RejectPurchaseOrderComponent,AddPurchaseManufactureMilestoneComponent,AddPurchaseDeliveryMilestoneComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA

  ],
})
export class DialogsModule { }
