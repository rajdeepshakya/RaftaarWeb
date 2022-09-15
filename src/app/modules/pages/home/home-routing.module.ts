import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewRequirementsComponent } from './add-new-requirements/add-new-requirements.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import { ElectronicProductSearchComponent } from './electronic-product-search/electronic-product-search.component';
import { HomeExpandedComponent } from './home-expanded/home-expanded.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { RequirementDetailComponent } from './requirement-detail/requirement-detail.component';
import { AddNewRequirementTabComponent } from './add-new-requirement-tab/add-new-requirement-tab.component';
import { ManufacturingOrderRequirementComponent } from './manufacturing-order-requirement/manufacturing-order-requirement.component';
import { HrRequirementComponent } from './hr-requirement/hr-requirement.component';
import { MachineRequirementComponent } from './machine-requirement/machine-requirement.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { FinanceComponent } from './finance/finance.component';
import { OthersComponent } from './others/others.component';
import { ManufacturingORHomeComponent } from './manufacturing-o-r-home/manufacturing-o-r-home.component';
import { HrRequirementHomeComponent } from './hr-requirement-home/hr-requirement-home.component';
import { MachineHomeComponent } from './machine-home/machine-home.component';
import { RawMaterialHomeComponent } from './raw-material-home/raw-material-home.component';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { OtherHomeComponent } from './other-home/other-home.component';
import { ManufacturingORListComponent } from './manufacturing-o-r-list/manufacturing-o-r-list.component';
import { HrRequirementListComponent } from './hr-requirement-list/hr-requirement-list.component';
import { MachineListComponent } from './machine-list/machine-list.component';
import { RawMaterailListComponent } from './raw-materail-list/raw-materail-list.component';
import { FinanceListComponent } from './finance-list/finance-list.component';
import { OtherListComponent } from './other-list/other-list.component';
import { InteresteduserComponent } from './interesteduser/interesteduser.component';
import { ProposalScreenComponent } from './proposal-screen/proposal-screen.component';
import { MypostListComponent } from './mypost-list/mypost-list.component';

const routes: Routes = [
 
  {
    path:'',
    component:HomeExpandedComponent
  },
  {
    path:'post-detail',
    component:PostDetailComponent
  },{
    path:'create-new-post',
    component:CreateNewPostComponent
  },
  {
    path:'add-new-requirementtab',
    component:AddNewRequirementTabComponent
  },
  {
    path:'manufacturing-o-r',
    component:ManufacturingOrderRequirementComponent
  },
  {
    path:'hr-requirement',
    component:HrRequirementComponent
  },
  {
    path:'machine-requirement',
    component:MachineRequirementComponent
  },
  {
    path:'raw-material',
    component:RawMaterialComponent
  },
  {
    path:'finance',
    component:FinanceComponent
  },
  {
    path:'other',
    component:OthersComponent
  },
  {
    path:'manufacturing-o-r_home',
    component:ManufacturingORHomeComponent
  },
  {
    path:'hr-requirement_home',
    component:HrRequirementHomeComponent
  },
  {
    path:'machine_home',
    component:MachineHomeComponent
  },
  {
    path:'rawmat_home',
    component:RawMaterialHomeComponent
  },
  {
    path:'finance_home',
    component:FinanceHomeComponent
  },
  {
    path:'other_home',
    component:OtherHomeComponent
  },
  {
    path:'manufacturing-o-r-list',
    component:ManufacturingORListComponent
  },
  {
    path:'hr-requirement-list',
    component:HrRequirementListComponent
  },
  {
    path:'machine-list',
    component:MachineListComponent
  },
  {
    path:'raw-materail-list',
    component:RawMaterailListComponent
  },
  {
    path:'finance-list',
    component:FinanceListComponent
  },
  {
    path:'other-list',
    component:OtherListComponent
  },
  {
    path:'interest-user',
    component:InteresteduserComponent
  },
  {
    path:'proposalscreen',
    component:ProposalScreenComponent
  }, 
  {
    path: 'my-post-list',
    component: MypostListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }