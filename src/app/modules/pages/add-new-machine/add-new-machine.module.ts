import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AddNewMachineRoutingModule } from './add-new-machine-routing.module';
import { AddNewMachineComponent } from './add-new-machine/add-new-machine.component';
import { EditMachineComponent } from './edit-machine/edit-machine.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';




@NgModule({
  declarations: [
    AddNewMachineComponent,
    EditMachineComponent
  ],
  imports: [
    CommonModule,
    AddNewMachineRoutingModule,
    LayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,

  ],
  providers: [DatePipe]

})
export class AddNewMachineModule { }
