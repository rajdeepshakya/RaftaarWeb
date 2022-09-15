import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from '../home/post-detail/post-detail.component';
import { MyPostModule } from './my-post.module';
import { MyPostComponent } from './my-post/my-post.component';
import { ProfileCreatePostComponent } from './profile-create-post/profile-create-post.component';
import { ProfileEditPostComponent } from './profile-edit-post/profile-edit-post.component';
import { ProfilePostDetailComponent } from './profile-post-detail/profile-post-detail.component';

const routes: Routes = [
  {
    path:'',
    component:MyPostComponent
  },
{
  path:'profile-post-detail',
  component:ProfilePostDetailComponent
},
{
  path:'profile-create-post',
  component:ProfileCreatePostComponent
},
{
  path:'profile-edit-post',
  component:ProfileEditPostComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPostRoutingModule { }
