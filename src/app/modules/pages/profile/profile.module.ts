import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileaboutComponent } from './profileabout/profileabout.component';
import { ProfileprojectsComponent } from './profileprojects/profileprojects.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { TemplatesModule } from 'src/app/shared/templates/templates.module';
import { ProfileFrontPageComponent } from './profile-front-page/profile-front-page.component';
import { ProfileprojectdetailComponent } from './profileprojectdetail/profileprojectdetail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PlasticmachineComponent } from './plasticmachine/plasticmachine.component';
import { ProfileProductsComponent } from './profile-products/profile-products.component';
import { ProfileInstrumentsComponent } from './profile-instruments/profile-instruments.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShareTestimonialComponent } from 'src/app/shared/dialogs/share-testimonial/share-testimonial.component';

@NgModule({
  declarations: [
    ProfileaboutComponent,
    ProfileprojectsComponent,
    ProfileFrontPageComponent,
    ProfileprojectdetailComponent,
    PlasticmachineComponent,
    ProfileProductsComponent,
    ProfileInstrumentsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutModule,
    TemplatesModule,
    CarouselModule,

  
  ]
})
export class ProfileModule { }
