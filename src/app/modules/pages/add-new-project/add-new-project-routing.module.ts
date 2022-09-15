import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

const routes: Routes = [
  {
    path:'',
    component:AddNewProjectComponent
  },
  {
    path:'edit-project',
    component:EditProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewProjectRoutingModule { }
