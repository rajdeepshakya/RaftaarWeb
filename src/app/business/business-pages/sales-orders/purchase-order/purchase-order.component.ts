import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { RejectComponent } from 'src/app/shared/dialogs/reject/reject.component';
import { SalesFilterComponent } from 'src/app/shared/dialogs/sales-filter/sales-filter.component';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {
  cards=[
    {
      img:'../../.assets/images/product.svg',
  
    },
    {
      img:'../../.assets/images/ear.svg',
      
    }
  ]
  isShow=false
  constructor(private dialog:MatDialog) { }
  showdropdown(){
    this.isShow=!this.isShow
  }
    ngOnInit(): void {
    }
    filterDialog(){
      const dialogRef=this.dialog.open(SalesFilterComponent,{
        maxHeight:'100vh',
        width:'421px',
        panelClass:'sales-filter',
        data: {
         
        }
      })
    }
    delete(){
      const dialogRef=this.dialog.open(EditPopupComponent,{
        maxHeight: '100vh',
        width:'465px',
        data: {
          img:'../.assets/images/App__icon.svg',
          heading:'Hey, do you really want to delete this product?',
          para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
          report:'Yes, delete',
          cancel:'Go back'
        }
      })
    }
    rejectOrder(){
      const dialogRef = this.dialog.open(RejectComponent, {
        maxHeight: '100vh',
        width:'523px',
      });
    }

}
