import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityLogRoutingModule } from './activity-log-routing.module';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    ActivityLogComponent
  ],
  imports: [
    CommonModule,
    ActivityLogRoutingModule,
    LayoutModule
  ]
})
export class ActivityLogModule { }
