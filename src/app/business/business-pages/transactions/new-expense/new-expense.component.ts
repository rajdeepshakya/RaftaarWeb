import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {
  addNewExpense: boolean = true;
  editExpense: boolean = false;
  expenseForm:any
  finaceForm: any;
  customfields: any = [];
  updateData: any;
  editFlag: boolean=false;
  submitted: boolean=false;
  editId: any;
  isdisable:boolean=true;
  expenses_type: any =  [{'id':'fixed','value':'fixed'},{'id':'variable expenses','value':'variable expenses'}];
  tax_type:any=[{'id':'gst',value:'gst'}];
  mode_of_payment:any=[{'id':'cheque',value:'cheque'},{'id':'net banking',value:'net banking'},{'id':'online',value:'online'},{
    'id':'bank transfer', value:'bank transfer'
  }]
 ;

  constructor(private dialog:MatDialog,
     private fb:FormBuilder,
     private service: ApiServicesService,
     public datepipe:DatePipe,
     private router :Router,
     private activeRoute:ActivatedRoute,
     private toastr: ToastrService
     ) 
     { 
      this.activeRoute.queryParams.subscribe((params) =>{
        this.editId = params?.['id'];
      })
     }

  ngOnInit(): void {
    if(this.editId && this.editId!= null && this.editId!=undefined && this.editId!= " "){
      this.editFlag = true;
    }
    if(this.editFlag && this.editId){
      this.createForm();
      this.expenseDetail(this.editId);
    }
    else {
      this.createForm();
    }
  }

createForm(){
  this.expenseForm = this.fb.group({
    expenses_type:['',[Validators.required]],
    note:['',[Validators.required]],
    company_name:['',[Validators.required]],
    associated_order_no:['',[Validators.required]],
    tax_type:['',[Validators.required]],
    tax_percentage:['',[Validators.required]],
    amount_payable:['',[Validators.required]],
    amount_paid:['',[Validators.required]],
    balance_amount:['',[Validators.required]],
    mode_of_payment:['',[Validators.required]],
    date_of_payment:['',[Validators.required]],
    receipt_no:['',[Validators.required]]
  })

}

expenseDetail(id:any) {
  let dataToPost = {
    expenses_id: id
  }
  this.service.get(dataToPost, API_ROUTES.Transactions.expenseDetails).pipe().subscribe((res => {
    console.log(res);
      this.updateData = res.result;
      this.setData();
  }))
}

setData() {
  this.addNewExpense=false
  this.expenseForm.patchValue({
    expenses_type:this.updateData.expenses_type,
    note:this.updateData.note,
    company_name:this.updateData.company_name,
    associated_order_no:this.updateData.associated_order_no,
    tax_type:this.updateData.tax_type,
    tax_percentage:this.updateData.tax_percentage,
    amount_payable:this.updateData.amount_payable,
    amount_paid:this.updateData.amount_paid,
    balance_amount:this.updateData.balance_amount,
    mode_of_payment:this.updateData.mode_of_payment,
    date_of_payment:this.updateData.date_of_payment,
    receipt_no:this.updateData.receipt_no
  })
}

get f() { return this.expenseForm.controls; }





  submitExpense(data:any){
    this.submitted = true;
    console.log(data)
    let projectDate=this.datepipe.transform(data.date_of_payment,'yyyy/MM/dd');
    data.date_of_payment=projectDate
    if (this.expenseForm.valid) {
      if (this.editFlag) {
        this.addNewExpense=false
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/addpost.png',
            heading: 'Are you sure you want to save this Expense?',
            report: 'Back',
            cancel: 'Yes, Save'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            // this.expenseForm.value.expenses_id = this.editId
            this.service.put(data, {expenses_id:this.editId}, API_ROUTES.Transactions.updateExpense).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Expense Updated Successfully',
                  title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/business/transactions/expenses']);
              });


            }))
          }

        })




      }
      else {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/addpost.png',
            heading: 'Are you sure you want to post this Expense?',
            report: 'Back',
            cancel: 'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.service.post(data, API_ROUTES.Transactions.addExpense, {}).pipe().subscribe((res) => {
              console.log(res);
              this.addNewExpense=false
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Expense Added Successfully',
                  title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/business/transactions/expenses']);
               
              });

            });
          }

        })
      }
    }
    
  }



  updateForm(form: any) {
    this.service.put(form, {}, API_ROUTES.Transactions.updateExpense).pipe().subscribe((res) => {
      console.log(res);
    })
  }

  
}
