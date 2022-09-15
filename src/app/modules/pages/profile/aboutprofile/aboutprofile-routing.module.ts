import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRequirementComponent } from './add-requirement/add-requirement.component';
import { BoostRequirementComponent } from './boost-requirement/boost-requirement.component';
import { EditRequirementComponent } from './edit-requirement/edit-requirement.component';
import { InterestedUserComponent } from './interested-user/interested-user.component';
import { MyrequirementComponent } from './myrequirement/myrequirement.component';
import { ProposalScreenComponent } from './proposal-screen/proposal-screen.component';
import { RequirementdetailComponent } from './requirementdetail/requirementdetail.component';

const routes: Routes = [{
  path:'',
  component:MyrequirementComponent
},
{
  path:'req-detail',
  component:RequirementdetailComponent

},{
  path:'int-user',
  component:InterestedUserComponent
},
{
  path:'boost-req',
  component:BoostRequirementComponent
},{
  path:'proposal',
  component:ProposalScreenComponent
},
{
  path:'add-requirement',
  component:AddRequirementComponent
},
{
  path:'edit-requirement',
  component:EditRequirementComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutprofileRoutingModule { }
