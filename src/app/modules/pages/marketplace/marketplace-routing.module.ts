import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { BestSellerProductsComponent } from './best-seller-products/best-seller-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { GrindingMachineComponent } from './grinding-machine/grinding-machine.component';
import { MarketFrontPageComponent } from './market-front-page/market-front-page.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { PopularProductComponent } from './popular-product/popular-product.component';
import { RequestRaftaarrVerificationComponent } from './request-raftaarr-verification/request-raftaarr-verification.component';
import { SarvayogastudioComponent } from './sarvayogastudio/sarvayogastudio.component';

const routes: Routes = [
  {
    path:'',
    component:MarketFrontPageComponent
  },
  {
    path:'add-new-product',
    component:AddNewProductComponent
  },
  {
    path:'sarva-yoga',
    component:SarvayogastudioComponent
  },
  {
    path:'request-raftaarr-verification',
    component:RequestRaftaarrVerificationComponent
  },
  {
    path:'popular-product',
    component:PopularProductComponent
  },
  {
    path:'new-arrivals',
    component:NewArrivalsComponent
  },
  {
    path:'best-seller-products',
    component:BestSellerProductsComponent
  },
  {
    path:'grindingmachine',
    component:GrindingMachineComponent
  },
  {
    path:'editproduct',
    component:EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
