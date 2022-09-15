import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-machine-sell',
  templateUrl: './machine-sell.component.html',
  styleUrls: ['./machine-sell.component.scss']
})
export class MachineSellComponent implements OnInit {
  open: any;

  constructor(private router:Router , private dialog:MatDialog, public dialogRef: MatDialogRef<MachineSellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  // addProduct(){
  //   this.router.navigate(['/main/marketplace/add-new-product'])
  // }

}
