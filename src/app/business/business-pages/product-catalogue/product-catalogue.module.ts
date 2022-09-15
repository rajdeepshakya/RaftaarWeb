import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCatalogueRoutingModule } from './product-catalogue-routing.module';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ProductSarvaYogaComponent } from './product-sarva-yoga/product-sarva-yoga.component';
import { MarketplaceModule } from 'src/app/modules/pages/marketplace/marketplace.module';
import { AddProductComponent } from './add-product/add-product.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductCatalogueDetailsComponent } from './product-catalogue-details/product-catalogue-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProductCatalogueComponent,
    ProductSarvaYogaComponent,
    AddProductComponent,
    ProductCatalogueDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductCatalogueRoutingModule,
    LayoutModule,
    MarketplaceModule,
    MatSelectModule,
    MatFormFieldModule,
    CarouselModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSliderModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatInputModule,
    NgxPaginationModule

  ]
})
export class ProductCatalogueModule { }
