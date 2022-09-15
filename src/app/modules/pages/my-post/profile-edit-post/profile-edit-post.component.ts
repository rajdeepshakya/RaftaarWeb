import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-profile-edit-post',
  templateUrl: './profile-edit-post.component.html',
  styleUrls: ['./profile-edit-post.component.scss']
})
export class ProfileEditPostComponent implements OnInit {

  countnumber:any="";
  contentform:any;
  constructor(private fb:UntypedFormBuilder,private dialog :MatDialog) { }


  ngOnInit(): void {
    this.contentform = this.fb.group({
      number:['',Validators.required]
 
     });
  }
  savePost(){
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      data: {
        img:'../.assets/images/Icon.png',
        heading:'Are you sure you want to save the changes?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Cancel',
        cancel:'Yes, Save'
      }
    });
  }

}
