import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketFrontPageComponent } from './market-front-page/market-front-page.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SarvayogastudioComponent } from './sarvayogastudio/sarvayogastudio.component';
import { RequestRaftaarrVerificationComponent } from './request-raftaarr-verification/request-raftaarr-verification.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import {MatSliderModule} from '@angular/material/slider';
import { PopularProductComponent } from './popular-product/popular-product.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { BestSellerProductsComponent } from './best-seller-products/best-seller-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { GrindingMachineComponent } from './grinding-machine/grinding-machine.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareModule } from 'ngx-sharebuttons'
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    MarketFrontPageComponent,
    AddNewProductComponent,
    SarvayogastudioComponent,
    RequestRaftaarrVerificationComponent,
    PopularProductComponent,
    NewArrivalsComponent,
    BestSellerProductsComponent,
    GrindingMachineComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    LayoutModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DirectivesModule,
    CarouselModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    FontAwesomeModule,
    ShareModule,
    NgxPaginationModule

  ],
  exports: [MarketFrontPageComponent,SarvayogastudioComponent],
  entryComponents:[
   MarketFrontPageComponent,SarvayogastudioComponent
  ],
  providers:[DatePipe]

})
export class MarketplaceModule { }
