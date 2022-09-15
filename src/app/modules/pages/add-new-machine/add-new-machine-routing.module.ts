import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewMachineModule } from './add-new-machine.module';
import { AddNewMachineComponent } from './add-new-machine/add-new-machine.component';
import { EditMachineComponent } from './edit-machine/edit-machine.component';

const routes: Routes = [
  {
    path:'',
    component:AddNewMachineComponent
  },
  {
    path:'edit-machine',
    component:EditMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewMachineRoutingModule { }
