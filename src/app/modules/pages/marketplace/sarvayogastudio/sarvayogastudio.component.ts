import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InterestedComponent } from 'src/app/shared/dialogs/interested/interested.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-sarvayogastudio',
  templateUrl: './sarvayogastudio.component.html',
  styleUrls: ['./sarvayogastudio.component.scss']
})
export class SarvayogastudioComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  interested(){
    const dialogRef=this.dialog.open(InterestedComponent,{
      maxHeight:'100vh',
      width:'575px',
      panelClass:'interested'

    })
  }
  requestSent(){
    const dialogRef=this.dialog.open(PostPublishComponent,{
      maxHeight:'100vh',
      width:'550px',
      panelClass:'payNow',
      data: {
        img:'../.assets/images/Completed_check.svg',
        heading:'Your request has been sent',
        btn:'Okay'
      }
    })
  }
}
