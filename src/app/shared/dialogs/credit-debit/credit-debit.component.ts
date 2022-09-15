import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-debit',
  templateUrl: './credit-debit.component.html',
  styleUrls: ['./credit-debit.component.scss']
})
export class CreditDebitComponent implements OnInit {
  open: any;

  constructor( public dialogRef: MatDialogRef<CreditDebitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }

  filters=[
    {
      label:'Date'
    },
    {
      label:'Customer'
    },
    {
      label:'Product'
    },
    {
      label:'Payable'
    },
    {
      label:'Paid'
    },
  ]
}