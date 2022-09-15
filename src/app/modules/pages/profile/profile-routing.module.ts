import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstant } from 'src/app/core/_constants/route.constant';
import { PlasticmachineComponent } from './plasticmachine/plasticmachine.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileFrontPageComponent } from './profile-front-page/profile-front-page.component';
import { ProfileInstrumentsComponent } from './profile-instruments/profile-instruments.component';
import { ProfileProductsComponent } from './profile-products/profile-products.component';
import { ProfileaboutComponent } from './profileabout/profileabout.component';
import { ProfileprojectdetailComponent } from './profileprojectdetail/profileprojectdetail.component';
import { ProfileprojectsComponent } from './profileprojects/profileprojects.component';

const routes: Routes = [
  {
    path:RouteConstant.newFeature,
    loadChildren:()=>import('../add-new-feature/add-new-feature.module').then((m)=>m.AddNewFeatureModule)
  },
  {
    path:RouteConstant.newMachine,
    loadChildren:()=>import('../add-new-machine/add-new-machine.module').then((m)=>m.AddNewMachineModule)
  },
  {
    path:RouteConstant.newProjects,
    loadChildren:()=>import('../add-new-project/add-new-project.module').then((m)=>m.AddNewProjectModule)
  },
  {
    path:RouteConstant.myPost,
    loadChildren:()=>import('../my-post/my-post.module').then((m)=>m.MyPostModule)
  },
  {
    path:RouteConstant.myMarketplace,
    loadChildren:()=>import('../my-marketplace/my-marketplace.module').then((m)=>m.MyMarketplaceModule)
  },
  {
    path:RouteConstant.aboutProfile,
    loadChildren:()=>import('./aboutprofile/aboutprofile.module').then((m)=>m.AboutprofileModule)
  },
  {
    path:RouteConstant.ads,
    loadChildren:()=>import('../ads/ads.module').then((m)=>m.AdsModule)
  },

  {
    path:'myMarketplace',
    loadChildren:()=>import('../my-marketplace/my-marketplace.module').then((m)=>m.MyMarketplaceModule)
  },
  // {
  // path:'',
  // component:ProfileFrontPageComponent
  // },
{
  path:'about',
  component:ProfileaboutComponent,
},
{
  path:'projects',
  component:ProfileprojectsComponent
},
{
  path:'instruments',
  component:ProfileInstrumentsComponent
},
{
  path:'profile-project-detail',
  component:ProfileprojectdetailComponent
},
{
  path:'product-details',
  component:ProductDetailsComponent
},
{
  path:'plastic-machine',
  component:PlasticmachineComponent
},
{
  path:'products',
  component:ProfileProductsComponent
},
{
  path:'**',
  redirectTo: 'about'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
