import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { ReadyDispatchComponent } from '../ready-dispatch/ready-dispatch.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-purchase-manufacture-milestone',
  templateUrl: './add-purchase-manufacture-milestone.component.html',
  styleUrls: ['./add-purchase-manufacture-milestone.component.scss']
})
export class AddPurchaseManufactureMilestoneComponent implements OnInit {

  open: any;
  files: any = [];
  myForm1: FormGroup;
  submitted = false;
  formData: any;
  ipAddress: any;
  //files: any = [];
  images: any = [];
  videos: any = [];
  Orderversion:any
  pdf: any = [];
  media: any = [];
  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddPurchaseManufactureMilestoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: ApiServicesService,
    private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    debugger

    this.formData = this.data.data;
   
    this.formData.Media.forEach((element: any) => {
      debugger
      let file = {
        'media_type': element.media_type,
        'url': element.url
      }
      if (element.media_type.toLowerCase().includes('image/png')) {
        this.images.push(file)
        this.media = this.images;
      }
      else if (element.media_type.toLowerCase().includes('video')) {
        this.videos.push(file)
        this.media = this.videos;
      }
      else {
        this.pdf.push(file)
        this.media = this.videos;
      }
    });
    this.files = [...this.images, ...this.videos, ...this.pdf];
    //this.files.push//=this.formData.Media;
    this.createForm();
    console.log("AddManufactureProductComponent=================================>" + JSON.stringify(this.formData));
  }
  get f() { return this.myForm1.controls; }
  /**createForm*/
  createForm() {
    this.myForm1 = this.fb.group({

      milestone_name: [this.formData.ProductDeliveryMilestones[0].milestone_name],
      product_delivery_start_date: [this.formData.ProductDeliveryMilestones[0].product_delivery_start_date],
      product_delivery_end_date: [this.formData.ProductDeliveryMilestones[0].product_delivery_end_date],
      unit_type: [this.formData.ProductDeliveryMilestones[0].unit_type],
      number_of_unit: [this.formData.ProductDeliveryMilestones[0].number_of_unit],
      payment_recieved_date: [this.formData.ProductDeliveryMilestones[0].payment_recieved_date],
      manufacturing_milestone_name: [null, Validators.required],
      manufacturing_start_date: [null, Validators.required],
      manufacturing_end_date: [null, Validators.required],
      manufacturing_number_of_unit: [null, Validators.required],
      manufacturing_unit_type: [null, Validators.required],
      manufacturing_payment_recieved_date: [null],
      manufacturing_id: [null],
      email: [this.formData.email, [Validators.required]],
      contact_no: [this.formData.contact_no, [Validators.required]],
      address: [this.formData.address, [Validators.required]],
      category1_id: [this.formData.category1_id, [Validators.required]],
      category2_id: [this.formData.category2_id, [Validators.required]],
      industry_id: [this.formData.industry_id, [Validators.required]],
      brand_id: [this.formData.brand_id, [Validators.required]],
      hsn_code: [this.formData.hsn_code],
      tax_type: [this.formData.tax_type],
      tax_percentage: [this.formData.tax_percentage],
      order_created_by: [this.formData.order_created_by],
      discount_percentage: [this.formData.discount_percentage],
      discount_type: [this.formData.discount_type],
      amount_recieved: [this.formData.amount_recieved],
      final_payment_date: [this.formData.final_payment_date],
      no_of_unit_ordered: [this.formData.no_of_unit_ordered],
      version: [null],
      price: [this.formData.price],
      media: [this.files],
      initial_id: [this.formData.initial_id],
      type: [this.formData.type],
      category3_id: [this.formData.category3_id, [Validators.required]],
      category4_id: [this.formData.category4_id, [Validators.required]],
      company_id: [this.formData.Auth.CompanyInfo.id, [Validators.required]]
    })

  }

  readyDispatch() {
    const dialogRef = this.dialog.open(ReadyDispatchComponent, {
      maxHeight: '100vh',
      width: '421px',
      panelClass: 'dispatch',
      data: {
        heading: 'Ready to dispatch?',
        report: 'Delay',
        cancel: 'Yes'
      }
    })
  }


  onSubmit(post: any) {
    this.submitted = true;

    // delete this.myForm.value.company_id;
    // if (this.myForm1.value.product_type === null) {
    //   delete this.myForm1.value.product_type;
    // }
    // if (this.myForm1.value.product_sub_type === null) {
    //   delete this.myForm1.value.product_sub_type;
    // }
    // if (this.myForm1.value.category3_id === null) {
    //   delete this.myForm1.value.category3_id;
    // }
    // if (this.myForm1.value.category4_id === null) {
    //   delete this.myForm1.value.category4_id;
    // }
    // if (this.myForm1.value.company_name === null) {
    //   delete this.myForm1.value.company_name;
    // }
    // if (this.myForm1.value.company_id === null) {
    //   delete this.myForm1.value.company_id;
    // }
    let Addedversion = parseFloat(this.formData.version) + 0.1;
    this.Orderversion = parseFloat(Addedversion.toFixed(1));

    if (this.myForm1.value.manufacturing_id === null) {
     post.manufacturing_id=this.formData.id;
    }else{
      post.manufacturing_id==this.formData.ProductManufacturingMilestones[0].id
    }
    if (this.myForm1.value.initial_id === null) {
      post.initial_id=this.formData.id;
     }else{
       post.initial_id==this.formData.initial_id;
     }
     if (this.myForm1.value.manufacturing_payment_recieved_date === null) {
      post.manufacturing_payment_recieved_date=new Date;
     }else{
       post.manufacturing_payment_recieved_date==this.formData.ProductManufacturingMilestones[0].manufacturing_payment_recieved_date;
     }
     post.version=this.Orderversion;
    debugger
    let firtsReq = this.myForm1.value;
    console.log("Request====================>" + JSON.stringify(firtsReq));
    if (this.myForm1.valid) {
      this.service.post(post,API_ROUTES.PurchaseOrder.updatePurchaseOrder,{}).pipe().subscribe((res => {
        if (res.success) {
          debugger
          this.dialogRef.close(true);
          this.toastr.success(res.message);
        }
        else {
          this.toastr.error(res.message);
        }
      }))
    }
  }


}
