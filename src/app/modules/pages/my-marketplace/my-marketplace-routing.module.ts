import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from '../marketplace/add-new-product/add-new-product.component';
import { MarketAddProductComponent } from './market-add-product/market-add-product.component';
import { MarketBubaPuppetLampComponent } from './market-buba-puppet-lamp/market-buba-puppet-lamp.component';
import { MarketEditProductComponent } from './market-edit-product/market-edit-product.component';
import { MarketInterestedUserComponent } from './market-interested-user/market-interested-user.component';
import { MarketProductDetailComponent } from './market-product-detail/market-product-detail.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';

const routes: Routes = [
  {
    path:'',
    component:MarketplaceComponent
  },
  {
    path:'market-add-product',
    component:MarketAddProductComponent
  },
  {
    path:'buba-puppet-lamp',
    component:MarketBubaPuppetLampComponent
  },
  {
    path:'interested-user',
    component:MarketInterestedUserComponent
  },
  {
    path:'market-product-detail',
    component:MarketProductDetailComponent
  },
  {
    path:'market-edit-product',
    component:MarketEditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMarketplaceRoutingModule { }
