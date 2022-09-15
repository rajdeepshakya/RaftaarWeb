import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import {NewExpenseComponent} from './new-expense/new-expense.component';
import { ViewStaticsComponent} from './view-statics/view-statics.component';
import {TransactionStaticsComponent} from './transaction-statics/transaction-statics.component';
import { TransactionCreditComponent } from './transaction-credit/transaction-credit.component';
import { TransactionDebitComponent } from './transaction-debit/transaction-debit.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
const routes: Routes = [
  {
    path:'view-statics',
    component:ViewStaticsComponent
  },
  {
    path: 'transaction-list',
    component : TransactionListComponent,
    children: [
      { 
        path: 'credit',
        component: TransactionCreditComponent
      },
      { 
        path: 'debit',
        component: TransactionDebitComponent
      },
      {
        path: '',
        redirectTo: 'debit',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  },
  {
    path: 'add-new-transaction',
    component: TransactionDetailComponent
  },
  {
    path: 'edit-transaction',
    component: TransactionDetailComponent
  },
  {
    path:'transaction-detail',
    component:TransactionDetailComponent
  },
  {
    path:'add-new-expense',
    component: NewExpenseComponent
  },
  {
    path: 'edit-expense',
    component: NewExpenseComponent
  },
  {
    path:'transaction-statics',
    component:TransactionStaticsComponent
  },
  {
    path: '',
    redirectTo: 'view-statics',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
