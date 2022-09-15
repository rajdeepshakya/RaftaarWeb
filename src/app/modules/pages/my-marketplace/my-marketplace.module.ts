import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMarketplaceRoutingModule } from './my-marketplace-routing.module';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { MarketplaceModule } from '../marketplace/marketplace.module';
import { MarketAddProductComponent } from './market-add-product/market-add-product.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MarketBubaPuppetLampComponent } from './market-buba-puppet-lamp/market-buba-puppet-lamp.component';
import { MarketInterestedUserComponent } from './market-interested-user/market-interested-user.component';
import { MarketProductDetailComponent } from './market-product-detail/market-product-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MarketEditProductComponent } from './market-edit-product/market-edit-product.component';


@NgModule({
  declarations: [
    MarketplaceComponent,
    MarketAddProductComponent,
    MarketBubaPuppetLampComponent,
    MarketInterestedUserComponent,
    MarketProductDetailComponent,
    MarketEditProductComponent,
   
  ],
  imports: [
    CommonModule,
    MyMarketplaceRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    LayoutModule,
    CarouselModule,
    MarketplaceModule

  ]
})
export class MyMarketplaceModule { }
