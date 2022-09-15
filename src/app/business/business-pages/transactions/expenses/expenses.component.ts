import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DataService } from 'src/app/services/data.service';
import { CreditDebitComponent } from 'src/app/shared/dialogs/credit-debit/credit-debit.component';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  isShow: boolean = false;

  expenses:any=[]
  
  constructor(
    private dialog:MatDialog,
    private router:Router,
    private service:ApiServicesService,
    private dataService:DataService
    
    ) { }

  ngOnInit(): void {
    this.getList()
  }

  showdropdown(id: any){
    console.log(id)
    this.isShow = !this.isShow;
  }

  

  // deleteExpense(id:any) {
  //   this.expenses = this.expenses.filter((item) => item.id !== id);
  // }

  creditDebit(){
    const dialogRef=this.dialog.open(CreditDebitComponent,{
      maxHeight: '100vh',
      width:'465px',
      panelClass:'credit'
    })
  }


  onSubmit() {

  }
  
  getList(){
   let expenseType={
     type:'expenses'
   }
    this.service.get(expenseType,API_ROUTES.Transactions.expenseList).pipe().subscribe((res => {
      console.log(res);
      this.expenses = res.result;


    }))
  }

  edit(id:any){
    this.router.navigate(['/business/transactions/add-new-expense'],{queryParams: {id:id}});

    
  }

  delete(id:any){
    const dialogRef=this.dialog.open(DeleteComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'assets/images/App__icon.svg',
        heading:'Hey, do you really want to delete this expense?',
        content:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, delete',
        cancel:'Go back',
      }
    })
    let dataToDelete = {
      'expenses_id':id
    }
    this.service.delete(dataToDelete,API_ROUTES.Transactions.deleteExpense).pipe().subscribe((res =>{
      console.log(res);
      if (res.success) {
        this.expenses = [];
        this.getList();
      }
       else {
      }
    }))
  }
}
