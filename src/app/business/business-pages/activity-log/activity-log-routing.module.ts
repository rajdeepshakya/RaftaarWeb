import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/_constants/guards/auth.guard';
import { ActivityLogModule } from './activity-log.module';
import { ActivityLogComponent } from './activity-log/activity-log.component';

const routes: Routes = [
  {
    path:'',
    component:ActivityLogComponent
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityLogRoutingModule { }
