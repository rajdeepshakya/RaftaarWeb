import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-add-new-requirements',
  templateUrl: './add-new-requirements.component.html',
  styleUrls: ['./add-new-requirements.component.scss']
})
export class AddNewRequirementsComponent implements OnInit {
  countnumber:any="";
  contentform:any;
  constructor(private fb:UntypedFormBuilder,private dialog :MatDialog) { }


  ngOnInit(): void {
    this.contentform = this.fb.group({
      number:['',Validators.required]
 
     });
  }
    postPublish(){
      const dialogRef = this.dialog.open(PostPublishComponent, {
        maxHeight: '100vh',
        width:'550px',
        panelClass:'postPublish',
        data: {
          img:'assets/images/Completed_check.svg',
          heading:'Post Published',
          title:'Please check your inbox and click in the recieved link to reset a password',
          btn:'Okay'
        }
      });
    }
      requirementPublish(){
        const dialogRef = this.dialog.open(PostPublishComponent, {
          maxHeight: '100vh',
          width:'550px',
          panelClass:'postPublish',
          data: {
            img:'assets/images/Completed_check.svg',
            heading:'Requirement Published',
            title:'Please check your inbox and click in the recieved link to reset a password',
            btn:'Okay'
          }
        });
    }
  }

