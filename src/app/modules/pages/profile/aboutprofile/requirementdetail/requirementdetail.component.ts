import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoostComponent } from 'src/app/shared/dialogs/boost/boost.component';

@Component({
  selector: 'app-requirementdetail',
  templateUrl: './requirementdetail.component.html',
  styleUrls: ['./requirementdetail.component.scss']
})
export class RequirementdetailComponent implements OnInit {
  data:any=[1,2,3]
  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  boost(){
    const dialogRef=this.dialog.open(BoostComponent,{
      maxHeight: '100vh',
      width:'801px',
      panelClass:'dispatch',
      data: {
      }
    })
  }
}
