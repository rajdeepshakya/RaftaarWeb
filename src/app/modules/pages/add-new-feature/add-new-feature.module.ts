import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewFeatureRoutingModule } from './add-new-feature-routing.module';
import { AddNewFeaturedProductComponent } from './add-new-featured-product/add-new-featured-product.component';
import { EditFeatureProductComponent } from './edit-feature-product/edit-feature-product.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddNewFeaturedProductComponent,
    EditFeatureProductComponent
  ],
  imports: [
    CommonModule,
    AddNewFeatureRoutingModule,
    LayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class AddNewFeatureModule { }
