import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-payer',
  templateUrl: './payment-payer.component.html',
  styleUrls: ['./payment-payer.component.scss']
})
export class PaymentPayerComponent implements OnInit {
  open: any;
  inputDate:any;

  constructor(private dialog:MatDialog, public dialogRef: MatDialogRef<PaymentPayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.inputDate != ""){
      this.dialogRef.close({ event: 'submit', data: this.inputDate });
    }
    else {

    }
  }

  close(){
    this.dialogRef.close({ event: 'close' });
  }

}
