import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreditDebitComponent } from 'src/app/shared/dialogs/credit-debit/credit-debit.component';

@Component({
  selector: 'app-transaction-statics',
  templateUrl: './transaction-statics.component.html',
  styleUrls: ['./transaction-statics.component.scss']
})
export class TransactionStaticsComponent implements OnInit {
  addExpenseRoute: boolean = false;
  currentUrl: any;
  addTransactionRoute: boolean = false;

  constructor(private dialog:MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.route.url;
    if(this.currentUrl == '/business/transactions/expenses') {
      this.addExpenseRoute = true;
      this.addTransactionRoute = false;
    }
    else if(this.currentUrl == '/business/transactions/transaction-list/debit') {
      this.addTransactionRoute = true;
      this.addExpenseRoute = false;
    }
    else if(this.currentUrl == '/business/transactions/transaction-list/credit') {
      this.addTransactionRoute = true;
      this.addExpenseRoute = false;
    }

    else {
      this.addExpenseRoute = false;
      this.addTransactionRoute = false;
    }
  }

  creditDebit(){
    const dialogRef=this.dialog.open(CreditDebitComponent,{
      maxHeight: '100vh',
      width:'465px',
      panelClass:'credit'
    })
  }
}
