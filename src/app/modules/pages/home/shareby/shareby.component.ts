import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shareby',
  templateUrl: './shareby.component.html',
  styleUrls: ['./shareby.component.scss']
})
export class SharebyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SharebyComponent>) { }

  ngOnInit(): void {
  }
  reponse(type:any){
    this.dialogRef.close( {result:true,data: type });

  }

}
