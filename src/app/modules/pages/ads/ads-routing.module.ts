import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { AdsDetailComponent } from './ads-detail/ads-detail.component';
import { AdsViewComponent } from './ads-view/ads-view.component';
import { CompletePriceComponent } from './complete-price/complete-price.component';
import { DisplayCriteriaComponent } from './display-criteria/display-criteria.component';

const routes: Routes = [
  {
    path:'',
    component:AddAdsComponent
  },
  {
    path:'display-criteria',
    component:DisplayCriteriaComponent
  },
  {
    path:'complete-price',
    component:CompletePriceComponent
  },
  {
    path:'ads-view',
    component:AdsViewComponent
  },
  {
    path:'ads-detail',
    component:AdsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
