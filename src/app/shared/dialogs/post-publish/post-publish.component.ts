import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-publish',
  templateUrl: './post-publish.component.html',
  styleUrls: ['./post-publish.component.scss']
})
export class PostPublishComponent implements OnInit {
  open: any;
  constructor( public dialogRef: MatDialogRef<PostPublishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
