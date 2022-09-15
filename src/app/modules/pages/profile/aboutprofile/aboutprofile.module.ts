import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutprofileRoutingModule } from './aboutprofile-routing.module';
import { MyrequirementComponent } from './myrequirement/myrequirement.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RequirementdetailComponent } from './requirementdetail/requirementdetail.component';
import { InterestedUserComponent } from './interested-user/interested-user.component';
import { BoostRequirementComponent } from './boost-requirement/boost-requirement.component';
import { ProposalScreenComponent } from './proposal-screen/proposal-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRequirementComponent } from './add-requirement/add-requirement.component';
import { EditRequirementComponent } from './edit-requirement/edit-requirement.component';


@NgModule({
  declarations: [
    MyrequirementComponent,
    RequirementdetailComponent,
    InterestedUserComponent,
    BoostRequirementComponent,
    ProposalScreenComponent,
    AddRequirementComponent,
    EditRequirementComponent
  ],
  imports: [
    CommonModule,
    AboutprofileRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AboutprofileModule { }
