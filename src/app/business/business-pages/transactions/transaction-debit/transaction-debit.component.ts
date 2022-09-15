import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CreditDebitComponent } from 'src/app/shared/dialogs/credit-debit/credit-debit.component';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-transaction-debit',
  templateUrl: './transaction-debit.component.html',
  styleUrls: ['./transaction-debit.component.scss']
})
export class TransactionDebitComponent implements OnInit {
  isShow: boolean = false;
  cards=[
    {
      serial:'1',
      name:'Prabhakar Undurthi',
      id:'#7ARAF4567',
      transactionAmount:'₹50,000',
      dueAmount:'₹13,000',
      type:'Online',
      date:'22/03/2022',
      Note:'₹50k is done now only ₹13k is remaining.'
    },
    {
      serial:'2',
      name:'Prabhakar Undurthi',
      id:'#7ARAF4567',
      transactionAmount:'₹50,000',
      dueAmount:'₹13,000',
      type:'Online',
      date:'22/03/2022',
      Note:'₹50k is done now only ₹13k is remaining.'
    }
  ]
  data: any;
  noDataFound: boolean = false;
  constructor(private dialog:MatDialog, private router: Router,private service:ApiServicesService) { }

  ngOnInit(): void {
    this.transactionsList()
  }

  transactionsList(){
    let type ={
      type:"transaction"
    }
    this.service.get(type, API_ROUTES.Transactions.transactionList).pipe().subscribe((res) => {
      console.log(res);
      if(res.success) {
        this.data = res.result
        this.data = res.result.filter((element:any) => { if (element.transaction_type.toLowerCase() == 'debit') return element});
      }
    
      if(this.data && (this.data.length == 0 || this.data==null)){
        this.noDataFound=true
      }
    },(error)=>{
      this.noDataFound=true
    });
  }

  showdropdown(serial: any){
    console.log(serial)
    this.isShow = !this.isShow;
    if(this.cards[serial] == serial) {
    }
  }

  deletePopup(id:any){
    const dialogRef=this.dialog.open(DeleteComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'../assets/images/App__icon.svg',
        heading:'Hey, do you really want to delete this transaction?',
        content:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, delete',
        cancel:'Go back',
      }
    })
  }

  editTransaction(id:any){
    this.router.navigate(['/business/transactions/add-new-transaction'],{queryParams: {id:id}});
  }

  deleteTransaction(id:any){
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      // panelClass:'yespost',
      data: {
        img:'assets/images/Delete.png',
        heading:'Hey, do you really want to delete this transaction?',
        report:'Yes, delete',
        cancel:'Go, back'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
      let dataToDelete = {
        'transaction_id':id
      }
      this.service.delete(dataToDelete,API_ROUTES.Transactions.deleteTransaction).pipe().subscribe((res =>{
        console.log(res);
        if (res.success) {
          this.data = [];
          this.transactionsList();
        }
         else {
        }
      }))
    }
    });
  }

  creditDebit(){
    const dialogRef=this.dialog.open(CreditDebitComponent,{
      maxHeight: '100vh',
      width:'465px',
      panelClass:'credit'
    })
  }
}
