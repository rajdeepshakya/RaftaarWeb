import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductCatalogueDetailsComponent } from './product-catalogue-details/product-catalogue-details.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductSarvaYogaComponent } from './product-sarva-yoga/product-sarva-yoga.component';

const routes: Routes = [
  {
    path:'',
    component:ProductCatalogueComponent
  },
  {
    path:'product-sarva-yoga',
    component:ProductSarvaYogaComponent
  },
  {
    path:'add-product',
    component:AddProductComponent
  },
  {
    path:'product-catalogue-details',
    component:ProductCatalogueDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCatalogueRoutingModule { }
