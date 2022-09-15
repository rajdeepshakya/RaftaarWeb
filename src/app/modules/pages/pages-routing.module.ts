import { NgModule } from '@angular/core';
import { RouterModule, RouterState, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/_constants/guards/auth.guard';
import { RouteConstant } from 'src/app/core/_constants/route.constant';


const routes: Routes = [
  {
    path:RouteConstant.home,
    loadChildren: ()=> import(`./home/home.module`).then((m)=>m.HomeModule),
    
  },
  {
    path:RouteConstant.marketplace,
    loadChildren:()=> import('./marketplace/marketplace.module').then((m)=>m.MarketplaceModule),
    // canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.more,
    loadChildren:()=> import('./more/more.module').then((m)=>m.MoreModule),
  },
  {
    path:RouteConstant.profile,
    loadChildren:()=>import('./profile/profile.module').then((m)=>m.ProfileModule),
    // canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.newFeature,
    loadChildren:()=>import('./add-new-feature/add-new-feature.module').then((m)=>m.AddNewFeatureModule),
    // canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.newMachine,
    loadChildren:()=>import('./add-new-machine/add-new-machine.module').then((m)=>m.AddNewMachineModule),
    // canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.newProjects,
    loadChildren:()=>import('./add-new-project/add-new-project.module').then((m)=>m.AddNewProjectModule),
    canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.myMarketplace,
    loadChildren:()=>import('./my-marketplace/my-marketplace.module').then((m)=>m.MyMarketplaceModule),
    // canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.myPost,
    loadChildren:()=>import('./my-post/my-post.module').then((m)=>m.MyPostModule),
    // canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.chat,
    loadChildren:()=>import('./chat/chat.module').then((m)=>m.ChatModule),
    // canActivate: [AuthGuard]
  },
  {
    path:RouteConstant.ads,
    loadChildren:()=>import('./ads/ads.module').then((m)=>m.AdsModule),  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
