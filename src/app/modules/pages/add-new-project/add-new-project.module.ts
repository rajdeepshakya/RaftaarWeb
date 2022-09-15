import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewProjectRoutingModule } from './add-new-project-routing.module';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AddNewProjectComponent,
    EditProjectComponent
  ],
  imports: [
    CommonModule,
    AddNewProjectRoutingModule,
    LayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    DirectivesModule,

    

  ],
  providers:[DatePipe]
})
export class AddNewProjectModule { }
