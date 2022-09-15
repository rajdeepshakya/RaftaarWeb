import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PaymentPayerComponent } from 'src/app/shared/dialogs/payment-payer/payment-payer.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  transactionForm: FormGroup
  paymentForm:FormGroup
  itras:any=['name','surname'];
  currentUrl: string;
  addNewTransaction: boolean = false;
  editTransaction: boolean = false;
  transactionDetail: boolean = false;
  isShow: boolean = false;
  industrylist: any;
  category1List: any;
  productSubCategory: any;
  productType: any;
  productSubType: any;
  productBrand: any;
  modeOfpayment = ['Cheque','Net Banking','NEFT','Online Payment'];
  taxTypes= ['gst'];
  transactionTypes = ['credit','debit'];
  editId: any;
  updateData: any;
  paymentStatus: boolean = false;
  submitted1: boolean = false;
  submitted: boolean = false;
  hsnPattern = "[0-9]{6,8}";
  companyNamePattern = "[a-zA-Z ]{1,50}";
  amountPattern = "[0-9]{1,9}";
  orderNumPattern = "^[a-zA-Z0-9]{10}$";
  receiptPattern = "^[a-zA-Z0-9]{1,20}$";
  notePattern = "^[a-zA-Z0-9]$";
  constructor(private dialog:MatDialog, private router: Router,private service:ApiServicesService,private fb:FormBuilder,
    private activeRoute:ActivatedRoute, private commonService: CommonService) {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.editId = params?.['id'];  
      let status = params?.['status'];
      if(status && status == "true"){
        this.paymentStatus = true;
      }
      else {
        this.paymentStatus = false;
      }
    })
   }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    // if(this.currentUrl == '/business/transactions/add-new-transaction') {
    //   this.addNewTransaction = true;
    //   this.editTransaction = false;
    //   this.transactionDetail = false;
    // }
    // else if(this.currentUrl == '/business/transactions/transaction-detail'){
    //   this.transactionDetail = true;
    //   this.addNewTransaction = false;
    //   this.editTransaction = false;
    // }
    // else if(this.currentUrl == '/business/transactions/edit-transaction') {
    //   this.editTransaction = true;
    //   this.addNewTransaction = false;
    //   this.transactionDetail = false;
    // }
    if(this.editId && this.editId != null && this.editId != undefined && this.editId!= " " && this.paymentStatus!= true){
      this.editTransaction = true;
      this.createForm();
      this.industryList();
      this.transactionsDetail(this.editId);
    }
    else if(this.editId && this.paymentStatus){
      this.transactionDetail = true;
      this.createForm();
      this.transactionForm.disable();
      this.industryList();
      this.transactionsDetail(this.editId);
    }
    else {
      this.addNewTransaction = true;
      this.createForm();
      this.industryList();
    }
  }

  showdropdown() {
    this.isShow = !this.isShow;
  }

  createForm(){
    this.transactionForm = this.fb.group({
      transaction_type: ['',Validators.required],
      company_name: ['',[Validators.required, Validators.pattern(this.companyNamePattern)]],
      associated_order_no: ['',[Validators.required, Validators.pattern(this.orderNumPattern)]],
      category1_id: ['',Validators.required],
      category2_id: ['',Validators.required],
      category3_id: ['',Validators.required],
      category4_id: ['',Validators.required],
      industry_id: ['',Validators.required],
      brand_id: ['',Validators.required],
      hsn_code: ['',[Validators.required, Validators.pattern(this.hsnPattern)]],
      tax_type: ['',Validators.required],
      tax_percentage: ['',Validators.required],
      amount_receivable: ['', [Validators.required, Validators.pattern(this.amountPattern)]],
      amount_recieved: ['',Validators.required, Validators.pattern(this.amountPattern)],
      // status:['pending',Validators.required]
    })

    this.paymentForm =  this.fb.group({
      mode_of_payment: ['',Validators.required],
      date_of_payment: ['',Validators.required],
      note:['',[Validators.required, Validators.pattern(this.notePattern)]],
      receipt_no:['',[Validators.required, Validators.pattern(this.receiptPattern)]],
      balance_amount:['',[Validators.required, Validators.pattern(this.amountPattern)]]
    })
  }

  get f() {
    return this.transactionForm.controls;
  }

  get p() {
    return this.paymentForm.controls;
  }
  

  setData(){
    this.transactionForm.patchValue({
      transaction_type: this.updateData.transaction_type,
      company_name: this.updateData.company_name,
      associated_order_no: this.updateData.associated_order_no,
      category1_id: this.updateData.category1_id,
      category2_id:this.updateData.category2_id,
      category3_id: this.updateData.category3_id,
      category4_id: this.updateData.category4_id,
      industry_id: this.updateData.industry_id,
      brand_id: this.updateData.brand_id,
      hsn_code: this.updateData.hsn_code,
      tax_type: this.updateData.tax_type,
      tax_percentage: this.updateData.tax_percentage,
      amount_receivable: this.updateData.amount_receivable,
      amount_recieved: this.updateData.amount_recieved
    })

    let category1 = {
      // target : {
        value: this.updateData.category1_id
      // }
    }
    let industry = {
      // target: {
        value:this.updateData.industry_id
      // }
    }
    let category2 = {
      // target : {
        value: this.updateData.category2_id
      // }
    }
    let category3 = {
      // target : {
        value: this.updateData.category3_id
      // }
    }
    // let category4 = {
    //   target : {
    //     value: this.updateData.category4_id
    //   }
    // }
    this.getIndustry(industry);
    this.getSubCatagory(category1);
    this.productTypes(category2);
    this.productsubType(category3);
    this.brand(category1)
  }

  transactionsDetail(id:any){
    let transaction_id = {
      transaction_id:id
    }
    this.service.get(transaction_id,API_ROUTES.Transactions.detailTransaction).pipe().subscribe((res => {
      console.log(res);
      this.updateData = res.result;
      this.setData();
    }))
  }

  savePost(){
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      data: {
        img:'../assets/images/Icon.png',
        heading:'Are you sure you want to save the changes?',
        report:'Cancel',
        cancel:'Yes, Save'
      }
    });
  }

  paymentPayers(){
    const dialogRef = this.dialog.open(PaymentPayerComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      // data: {
      //   img:'../assets/images/Icon.png',
      //   heading:'Are you sure you want to save the changes?',
      //   report:'Cancel',
      //   cancel:'Yes, Save'
      // }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.createTransaction();
      }
    });
  }

  openPaymentPayer() {
    this.paymentPayers();
  }

  onSubmit(event:any) {
    this.submitted = true;
    event.preventDefault();
    // if(this.currentUrl == '/business/transactions/add-new-transaction' || this.currentUrl == '/business/transactions/transaction-detail') {
    //   this.route.navigate(['business/transactions/transaction-list/debit']);
    // }

    

    // else if(this.currentUrl == '/business/transactions/transaction-detail') {
    //   this.paymentPayers();
    // }

    // else if(this.currentUrl == '/business/transactions/edit-transaction') {
    //   this.savePost();
    // }
    if(this.paymentForm.value['mode_of_payment'] != "" || this.paymentForm.value['date_of_payment'] != "" || this.paymentForm.value['note'] != "" ||
    this.paymentForm.value['receipt_no'] != "" || this.paymentForm.value['balance_amount'] != ""){
      this.submitted1 = true;
      this.paymentPayers();
    }
    else if(this.editId && this.editTransaction) {
      this.updateForm();
    }
    else {
      this.createTransaction();
    }
    
  }

  createTransaction(){
    this.service.post(this.transactionForm.value, API_ROUTES.Transactions.create, {}).pipe().subscribe((res) => {
      console.log(res);
      const dialogRef = this.dialog.open(PostPublishComponent, {
        maxHeight: '100vh',
        width: '465px',
        panelClass: 'products',
        data: {
          img: 'assets/images/Success.png',
          heading: 'Transaction Added Successfully',
          title: 'Your transaction has been added successfully',
          btn: 'Okay'
        }

      }
      );
      dialogRef.afterClosed().subscribe(result => {
        if(this.transactionForm.value['transaction_type'] == 'credit'){
          this.router.navigate(['business/transactions/transaction-list/credit']);
        }
        else {
          this.router.navigate(['business/transactions/transaction-list/debit']);
        }
      });

    });
  }

  updateForm(){
    let form = {
      ...this.transactionForm.value,
      ...this.paymentForm.value
    }
    let id = {
      transaction_id:this.editId
    }
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width: '465px',
      panelClass: 'yespost',
      data: {
        img: 'assets/images/addpost.png',
        heading: 'Are you sure you want to save this changes?',
        report: 'Back',
        cancel: 'Yes, Save'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result == true){
        this.service.put(form,id,API_ROUTES.Transactions.updateTransaction).pipe().subscribe((res =>{
          console.log(res);
          
        }))
      }

    })
    
  }

  industryList() {
    this.service.get({}, API_ROUTES.MyRequirements.industryList).pipe().subscribe((res => {
      console.log(res);
      if (res.success) {
        this.industrylist = res.result;
        // console.log("industrylist=" + this.industrylist);
      } else {
        // this.toastr.error(res.msg)
      }

    }))



  }

  getIndustry(event:any) {
    let industry = {
      industry_id: event.value
    }
    this.service.get(industry, API_ROUTES.MyRequirements.industryCategory1).pipe().subscribe((res => {
      console.log(res);
      if (res.success) {
        this.category1List = res.result.rows;
      }
      else {
        // this.toastr.error(res.msg);
      }

    }))

  }
  getSubCatagory(event:any){
    this.service.get({category1_id:event.value},`${API_ROUTES.Marketplace.catagory_2}`).pipe().subscribe((res)=>{
      this.productSubCategory = res.result.rows;
      
    })
  }
  productTypes(event:any){
    this.service.get({category2_id:event.value},`${API_ROUTES.Marketplace.catagory_3}`).pipe().subscribe((res)=>{
      this.productType = res.result.rows;
      
    })
  }
  productsubType(event:any){
    this.service.get({category3_id:event.value},`${API_ROUTES.Marketplace.catagory_4}`).pipe().subscribe((res)=>{
      this.productSubType = res.result.rows;
    })
  }
  brand(event:any){
    this.service.get({category1_id:event.value},`${API_ROUTES.Marketplace.brand}`).pipe().subscribe((res)=>{
      this.productBrand = res.result.rows;
    })
  }

  lettersOnly(event1: any) {
    var charCode = event1.keyCode;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 13)

      return true;
    else
      return false;
  }

  isNumberKey(evt: any) {
    console.log(evt)
    //var e = evt || window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  alphaNumeric(evt: any) {
    // no special character
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 13)
      return true;
    else
      return false;
  }

  addressChars(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode === 47 || charCode === 32 || charCode === 45 || charCode == 13)
      return true;
    else
      return false;
   
  }

  navigateBack() {
    this.commonService.goBack();
  }
}
