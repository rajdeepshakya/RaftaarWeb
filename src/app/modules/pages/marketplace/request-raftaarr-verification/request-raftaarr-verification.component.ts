import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-request-raftaarr-verification',
  templateUrl: './request-raftaarr-verification.component.html',
  styleUrls: ['./request-raftaarr-verification.component.scss']
})
export class RequestRaftaarrVerificationComponent implements OnInit {
items=[
  {
    heading:'Lorem Ipsum is simply dummy text of the printing',
    para:'It is a long established fact that a reader will be distracted by readables.',
    img:'../../.assets/images/number.svg'
  },{
    heading:'Lorem Ipsum is simply dummy text of the printing',
    para:'It is a long established fact that a reader will be distracted by readables.',
    img:'../../.assets/images/number_2.svg'
  },
  {
    heading:'Lorem Ipsum is simply dummy text of the printing',
    para:'It is a long established fact that a reader will be distracted by readables.',
    img:'../../.assets/images/number_3.svg'
  }
]
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  payNow(){
    const dialogRef=this.dialog.open(PostPublishComponent,{
      maxHeight: '100vh',
      width:'550px',
      panelClass:'payNow',
      data: {
        img:'../.assets/images/Completed_check.svg',
        heading:'Raftaar verification has been verified',
        btn:'Okay'
      }
    })
  }
}
