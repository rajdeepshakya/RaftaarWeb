import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostPublishComponent } from '../post-publish/post-publish.component';

@Component({
  selector: 'app-external-share',
  templateUrl: './external-share.component.html',
  styleUrls: ['./external-share.component.scss']
})
export class ExternalShareComponent implements OnInit {

  constructor(private dialog:MatDialog, public dialogRef: MatDialogRef<ExternalShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}





