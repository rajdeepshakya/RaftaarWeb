import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MenuComponent } from './menu/menu.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SavedComponent } from './saved/saved.component';
import { InterestsComponent } from './interests/interests.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ViewUserComponent } from './view-user/view-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddnewuserComponent } from './addnewuser/addnewuser.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TemplatesModule } from 'src/app/shared/templates/templates.module';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewUserDetailComponent } from './view-user-detail/view-user-detail.component';
import { FaqComponent } from './faq/faq.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { DateAsAgoPipe } from 'src/app/shared/date-as-ago.pipe';
// import { DateAsAgoPipe } from 'src/app/shared/date-as-ago.pipe';



@NgModule({
  declarations: [
    MenuComponent,
    EditprofileComponent,
    SavedComponent,
    InterestsComponent,
    ViewUserComponent,
    UserDetailComponent,
    SettingsComponent,
    NotificationsComponent,
    AddnewuserComponent,
    ChangepasswordComponent,
    TermsandconditionsComponent,
    PrivacypolicyComponent,
    ProfileHeaderComponent,
    ViewUserDetailComponent,
    FaqComponent,
    // DateAsAgoPipe
  ],
  imports: [
    CommonModule,
    MoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    MatButtonToggleModule,
    LayoutModule,
    TemplatesModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CarouselModule,
    
    
  ]
})
export class MoreModule { }
