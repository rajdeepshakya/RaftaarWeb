import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-interested',
  templateUrl: './interested.component.html',
  styleUrls: ['./interested.component.scss']
})
export class InterestedComponent implements OnInit {
  open: any;
  amount:any;
  constructor( public dialogRef: MatDialogRef<InterestedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  send(){
    this.dialogRef.close({ event: 'close', data: this.amount?this.amount:0 });
  }

}
