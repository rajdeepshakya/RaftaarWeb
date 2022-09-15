import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-edit-requirement',
  templateUrl: './edit-requirement.component.html',
  styleUrls: ['./edit-requirement.component.scss']
})
export class EditRequirementComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  savePost(){
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      data: {
        img:'../.assets/images/post_2.svg',
        heading:'Are you sure you want to save the changes?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Cancel',
        cancel:'Yes, Save'
      }
    });
  }
}
