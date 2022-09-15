import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ReadyDispatchComponent } from '../ready-dispatch/ready-dispatch.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { HttpClient  } from '@angular/common/http';
@Component({
  selector: 'app-add-manufacture-product',
  templateUrl: './add-manufacture-product.component.html',
  styleUrls: ['./add-manufacture-product.component.scss']
})
export class AddManufactureProductComponent implements OnInit {
  open: any;
  files: any = [];
  myForm: FormGroup;
  submitted=false;
  formData:any;
  ipAddress:any;
  constructor(private dialog :MatDialog,
     public dialogRef: MatDialogRef<AddManufactureProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private service: ApiServicesService,
    private toastr: ToastrService,private http:HttpClient) { }

  ngOnInit(): void {
    debugger
    this.formData=this.data.data;
    this.files=this.formData.Media;
    this.createForm();
    console.log("AddManufactureProductComponent=================================>"+JSON.stringify(this.formData));
  }
  get f() { return this.myForm.controls; }
    /**createForm*/
    createForm() {
      this.myForm = this.fb.group({
        company_name: this.formData.company_name,
        email: [this.formData.email, [Validators.required]],
        contact_no: [this.formData.contact_no, [Validators.required]],
        address: [this.formData.address, [Validators.required]],
        category1_id: [this.formData.category1_id, [Validators.required]],
        category2_id: [this.formData.category2_id, [Validators.required]],
        category3_id: [this.formData.category3_id, [Validators.required]],
        category4_id: [this.formData.category4_id, [Validators.required]],
        industry_id: [this.formData.industry_id, [Validators.required]],
        brand_id: [this.formData.brand_id, [Validators.required]],
        product_type: [this.formData.product_type],
        product_sub_type: [this.formData.product_sub_type],
        hsn_code: [this.formData.hsn_code],
        tax_type: [this.formData.tax_type],
        tax_percentage: [this.formData.tax_percentage],
        product_delivery_start_date: [null, [Validators.required]],
        product_delivery_end_date: [null, [Validators.required]],
        number_of_unit: [null, [Validators.required]],
        unit_type: [null, [Validators.required]],
        milestone_name: [null, [Validators.required]],
        payment_recieved_date: [this.formData.payment_recieved_date],
        order_created_by: [this.formData.order_created_by],
        discount_percentage: [this.formData.discount_percentage],
        discount_type: [this.formData.discount_type],
        amount_recieved: [this.formData.amount_recieved],
        final_payment_date: [this.formData.final_payment_date],
        no_of_unit_ordered: [this.formData.no_of_unit_ordered],
        type: [this.formData.type],
        initial_id: [this.formData.initial_id],
        parent_id: [this.formData.parent_id],
        version: [this.formData.version],
        price: [this.formData.price],
        media: [this.files],
        //custom_fields: [null],
      })
  
    }
   
  readyDispatch(){
    const dialogRef=this.dialog.open(ReadyDispatchComponent,{
      maxHeight: '100vh',
      width:'421px',
      panelClass:'dispatch',
      data: {
        heading:'Ready to dispatch?',
        report:'Delay',
        cancel:'Yes'
      }
    })
  }

  
  onSubmit(post:any) {
    this.submitted = true;

   // delete this.myForm.value.company_id;
   if (this.myForm.value.product_type=== null) {
    delete this.myForm.value.product_type;
  }
  if (this.myForm.value.product_sub_type=== null) {
    delete this.myForm.value.product_sub_type;
  }
  if (this.myForm.value.category3_id=== null) {
    delete this.myForm.value.category3_id;
  }
  if (this.myForm.value.category4_id=== null) {
    delete this.myForm.value.category4_id;
  }
  if (this.myForm.value.company_name=== null) {
    delete this.myForm.value.company_name;
  }
  if (this.myForm.value.company_id=== null) {
    delete this.myForm.value.company_id;
  }
    debugger
    let firtsReq = this.myForm.value;
      console.log("Request====================>" + JSON.stringify(firtsReq));
      if (this.myForm.valid) {
        this.service.post(post, API_ROUTES.PurchaseOrder.updatePurchaseOrder, {}).pipe().subscribe((res => {
          if (res.success) {
            this.dialogRef.close(true);
            this.toastr.success(res.message);
          }
          else{
            this.toastr.error(res.message);
          }
        }))
      }
  }

}
