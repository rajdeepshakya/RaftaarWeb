import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { InterestsComponent } from './interests/interests.component';
import { MenuComponent } from './menu/menu.component';
import { SavedComponent } from './saved/saved.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {AddnewuserComponent} from './addnewuser/addnewuser.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {TermsandconditionsComponent}from './termsandconditions/termsandconditions.component'; 
import {PrivacypolicyComponent} from './privacypolicy/privacypolicy.component';
import { AuthGuard } from 'src/app/core/_constants/guards/auth.guard';
import { ViewUserDetailComponent } from './view-user-detail/view-user-detail.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  {
    path:'',
    component:MenuComponent,
    // canActivate: [AuthGuard]

  },
  {
    path:'edit-profile',
    component:EditprofileComponent
  },
  {
    path:'saved',
    component:SavedComponent
  },
  {
    path:'interests',
    component:InterestsComponent
  },
  // {
  //   path:'viewuser',
  //   component:ViewUserComponent
  // },
  {
    path:'userdetail',
    component:UserDetailComponent
  
  },
  {
    path:'settings',
    component:SettingsComponent
  },
  {
    path:'notifications',
    component:NotificationsComponent
  },
  {
    path:'add-new-user',
    component:AddnewuserComponent
  },
  {
    path:'change-password',
    component:ChangepasswordComponent
  },{
    path:'terms-conditions',
    component:TermsandconditionsComponent 
  },{
    path:'privacy-policy',
  component:PrivacypolicyComponent
  },
  {
    path:'view-user-detail',
    component:ViewUserDetailComponent
  },
  {
    path:'faq',
    component:FaqComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreRoutingModule { }
