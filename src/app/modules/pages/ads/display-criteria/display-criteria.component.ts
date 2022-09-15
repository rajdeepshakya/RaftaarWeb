import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-display-criteria',
  templateUrl: './display-criteria.component.html',
  styleUrls: ['./display-criteria.component.scss']
})
export class DisplayCriteriaComponent implements OnInit {
  loginForm: any;
  submitted: boolean = false;
 
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  Post(){
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      data: {
        img:'../.assets/images/post_2.svg',
        heading:'Are you sure you want to post this project?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Back',
        cancel:'Yes, Post'
      }
    });
  }

}
