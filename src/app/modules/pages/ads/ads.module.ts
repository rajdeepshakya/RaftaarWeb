import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DisplayCriteriaComponent } from './display-criteria/display-criteria.component';
import { CompletePriceComponent } from './complete-price/complete-price.component';
import { AdsViewComponent } from './ads-view/ads-view.component';
import { AdsDetailComponent } from './ads-detail/ads-detail.component';


@NgModule({
  declarations: [
    AddAdsComponent,
    DisplayCriteriaComponent,
    CompletePriceComponent,
    AdsViewComponent,
    AdsDetailComponent
  ],
  imports: [
    CommonModule,
    AdsRoutingModule,
    LayoutModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class AdsModule { }
