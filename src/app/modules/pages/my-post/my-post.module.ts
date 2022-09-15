import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPostRoutingModule } from './my-post-routing.module';
import { MyPostComponent } from './my-post/my-post.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { TemplatesModule } from 'src/app/shared/templates/templates.module';
import { ProfilePostDetailComponent } from './profile-post-detail/profile-post-detail.component';
import { ProfileCreatePostComponent } from './profile-create-post/profile-create-post.component';
import { ProfileEditPostComponent } from './profile-edit-post/profile-edit-post.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    MyPostComponent,
    ProfilePostDetailComponent,
    ProfileCreatePostComponent,
    ProfileEditPostComponent,
  ],
  imports: [
    CommonModule,
    MyPostRoutingModule,
    LayoutModule,
    TemplatesModule,
    HomeModule
    
  ],
  
})
export class MyPostModule { }
