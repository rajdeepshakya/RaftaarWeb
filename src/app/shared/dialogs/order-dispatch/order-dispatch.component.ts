import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dispatch',
  templateUrl: './order-dispatch.component.html',
  styleUrls: ['./order-dispatch.component.scss']
})
export class OrderDispatchComponent implements OnInit {
  open: any;
  constructor( public dialogRef: MatDialogRef<OrderDispatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }

}
