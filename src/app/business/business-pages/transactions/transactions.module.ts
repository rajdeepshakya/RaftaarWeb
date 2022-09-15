import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { ViewStaticsComponent } from './view-statics/view-statics.component';
import { TransactionStaticsComponent } from './transaction-statics/transaction-statics.component';
import { TransactionCreditComponent } from './transaction-credit/transaction-credit.component';
import { TransactionDebitComponent } from './transaction-debit/transaction-debit.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
    declarations: [
        TransactionDetailComponent,
        NewExpenseComponent,
        ViewStaticsComponent,
        TransactionStaticsComponent,
        TransactionCreditComponent,
        TransactionDebitComponent,
        ExpensesComponent,
        TransactionListComponent
    ],
    imports: [
        CommonModule,
        TransactionsRoutingModule,
        LayoutModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [TransactionStaticsComponent]
})
export class TransactionsModule { }
