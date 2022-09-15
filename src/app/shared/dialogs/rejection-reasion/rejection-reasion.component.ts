import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-rejection-reasion',
  templateUrl: './rejection-reasion.component.html',
  styleUrls: ['./rejection-reasion.component.scss']
})
export class RejectionReasionComponent implements OnInit {

  constructor( private dialog:MatDialog, 
    public dialogRef: MatDialogRef<RejectionReasionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
  }

}
