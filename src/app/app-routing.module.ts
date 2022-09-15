import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/_constants/guards/auth.guard';
import { RouteConstant } from './core/_constants/route.constant';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: RouteConstant.layout,
    loadChildren: () => import(`./layout/layout.module`).then((m)=>m.LayoutModule),
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
