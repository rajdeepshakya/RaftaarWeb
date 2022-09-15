import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from '../marketplace/add-new-product/add-new-product.component';
import { AddNewFeaturedProductComponent } from './add-new-featured-product/add-new-featured-product.component';
import { EditFeatureProductComponent } from './edit-feature-product/edit-feature-product.component';

const routes: Routes = [
  {
    path:'',
    component:AddNewFeaturedProductComponent
  },
  {
    path:'edit-fetaure',
    component:EditFeatureProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewFeatureRoutingModule { }
