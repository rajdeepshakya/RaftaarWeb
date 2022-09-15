import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.scss']
})
export class AddRequirementComponent implements OnInit {


  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openpostModal(){
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      data: {
        img:'../.assets/images/post_2.svg',
        heading:'Are you sure you want to post this machine?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Back',
        cancel:'Yes, Post'
      }
    });
  }
}
