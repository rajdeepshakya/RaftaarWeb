import { CUSTOM_ELEMENTS_SCHEMA, NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPopupComponent } from './shared/dialogs/edit-popup/edit-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPostComponent } from './shared/dialogs/add-post/add-post.component';
import { PostPublishComponent } from './shared/dialogs/post-publish/post-publish.component';
import { AddFieldComponent } from './shared/dialogs/add-field/add-field.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterProductComponent } from './shared/dialogs/filter-product/filter-product.component';
import { MatTabsModule } from '@angular/material/tabs';
import { InterestedComponent } from './shared/dialogs/interested/interested.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ShareTestimonialComponent } from './shared/dialogs/share-testimonial/share-testimonial.component';
import { AddNewComponent } from './shared/dialogs/add-new/add-new.component';
import { DetailsComponent } from './shared/dialogs/details/details.component';
import { SalesFilterComponent } from './shared/dialogs/sales-filter/sales-filter.component';
import { RejectComponent } from './shared/dialogs/reject/reject.component';
import { AddManufactureProductComponent } from './shared/dialogs/add-manufacture-product/add-manufacture-product.component';
import { ReadyDispatchComponent } from './shared/dialogs/ready-dispatch/ready-dispatch.component';
import { DelayComponent } from './shared/dialogs/delay/delay.component';
import { OrderDispatchComponent } from './shared/dialogs/order-dispatch/order-dispatch.component';
import { PaymentPayerComponent } from './shared/dialogs/payment-payer/payment-payer.component';
import { CreditDebitComponent } from './shared/dialogs/credit-debit/credit-debit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './core/_constants/interceptor';
import { BoostComponent } from './shared/dialogs/boost/boost.component';
import { LogoutComponent } from './shared/dialogs/logout/logout.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { environment } from 'src/environments/environment';
import { MatSliderModule } from '@angular/material/slider';
import { DeleteComponent } from './shared/dialogs/delete/delete.component';
import { EditMobileComponent } from './shared/dialogs/edit-mobile/edit-mobile.component';
import { EditEmailComponent } from './shared/dialogs/edit-email/edit-email.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareModule } from 'ngx-sharebuttons';
import { AddpostComponent } from './shared/dialogs/addpost/addpost.component';
import { ReportComponent } from './shared/dialogs/report/report.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MessagingService } from './services/messaging.service';
import { MachineSellComponent } from './shared/dialogs/machine-sell/machine-sell.component';
import { RejectionReasionComponent } from './shared/dialogs/rejection-reasion/rejection-reasion.component';
import { AddSalesManufactureProductComponent } from './shared/dialogs/add-sales-manufacture-product/add-sales-manufacture-product.component';
import { AddSalesDeliveryMilestoneComponent } from './shared/dialogs/add-sales-delivery-milestone/add-sales-delivery-milestone.component';
import { RejectPurchaseOrderComponent } from './shared/dialogs/reject-purchase-order/reject-purchase-order.component';
import { AddPurchaseManufactureMilestoneComponent } from './shared/dialogs/add-purchase-manufacture-milestone/add-purchase-manufacture-milestone.component';
import { AddPurchaseDeliveryMilestoneComponent } from './shared/dialogs/add-purchase-delivery-milestone/add-purchase-delivery-milestone.component';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'blue',
  fgsColor: 'red',
  pbColor: 'green',
}

@NgModule({
  declarations: [
    AppComponent,
    EditPopupComponent,
    AddPostComponent,
    PostPublishComponent,
    AddFieldComponent,
    FilterProductComponent,
    InterestedComponent,
    ShareTestimonialComponent,
    AddNewComponent,
    DetailsComponent,
    SalesFilterComponent,
    RejectComponent,
    RejectionReasionComponent,
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
    AddpostComponent,
    ReportComponent,
    MachineSellComponent,AddSalesManufactureProductComponent,AddSalesDeliveryMilestoneComponent,RejectPurchaseOrderComponent,AddPurchaseManufactureMilestoneComponent,AddPurchaseDeliveryMilestoneComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonToggleModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatIconModule,
    MatDatepickerModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
    MatSliderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    }),
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    FontAwesomeModule,
    ShareModule,
    NgxPaginationModule


  ],
  exports:[
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }