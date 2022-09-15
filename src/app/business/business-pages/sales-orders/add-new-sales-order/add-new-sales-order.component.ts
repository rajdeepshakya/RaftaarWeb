import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-new-sales-order',
  templateUrl: './add-new-sales-order.component.html',
  styleUrls: ['./add-new-sales-order.component.scss']
})
export class AddNewSalesOrderComponent implements OnInit {
  itras: any = ['name', 'surname'];
  isEditable = false;
  Orderversion = 1.1;
  isReadOnly = false;
  purchaseOrderDetailForEdit: any
  salesManufactureDetailForEdit: any
  MediaFiles: any;
  isOtherSelected = false;
  companyType: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  array_name = ["gst"]
  unitType = ["KG", "Gram", "Meter", "Ton"]
  filterObj: any = {};
  files: any = [];
  images: any = [];
  videos: any = [];
  pdf: any = [];
  media: any = [];
  submitted = false;
  isAdd = true;
  phoneNumber: any;
  company_name: any;
  email: any;
  contact_no: any;
  address: any;
  category1_id: any;
  category2_id: any;
  category3_id: any;
  category4_id: any;
  industry_id: any;
  brand_id: any;
  product_type: any;
  product_sub_type: any;
  hsn_code: any;
  tax_type: any;
  tax_percentage: any;
  product_delivery_start_date: any;
  product_delivery_end_date: any;
  number_of_unit: any;
  unit_type: any;
  payment_recieved_date: any;
  order_created_by: any;
  milestone_name: any;
  discount_percentage: any;
  discount_type: any;
  amount_recieved: any;
  final_payment_date: any;
  no_of_unit_ordered: any;
  type: any;
  initial_id: any;
  version: any;
  price: any;
  range = {
    fromDate: new Date(),
    toDate: new Date()
  }

  firstFormGroup = this.fb.group({
    company_id: ['', null],
    email: ['', Validators.required],
    contact_no: ['', Validators.required],
    address: ['', Validators.required],
    company_name: [null],
    initial_id: ['',null]
  });
  secondFormGroup = this.fb.group({
    industry_id: ['', Validators.required],
    category1_id: ['', Validators.required],
    category2_id: ['', Validators.required],
    category3_id: ['', Validators.required],
    category4_id: ['', Validators.required],
    brand_id: ['', Validators.required],
    hsn_code: ['', Validators.required],
    price: ['', Validators.required],
  });
  taxDetailsFormGroup = this.fb.group({
    tax_type: ['', Validators.required],
    tax_percentage: ['', Validators.required],
  });
  productDeliveryFormGroup = this.fb.group({
    milestone_name: ['', Validators.required],
    product_delivery_start_date: ['', Validators.required],
    product_delivery_end_date: ['', Validators.required],
    number_of_unit: ['', Validators.required],
    unit_type: ['', Validators.required],
    payment_recieved_date: ['', Validators.required],
  });
  productManufacturingFormGroup = this.fb.group({
    manufacturing_milestone_name: ['', Validators.required],
    manufacturing_start_date: ['', Validators.required],
    manufacturing_end_date: ['', Validators.required],
    manufacturing_number_of_unit: ['', Validators.required],
    manufacturing_unit_type: ['', Validators.required],
    manufacturing_payment_recieved_date: ['', Validators.required]
  });
  otherDetailFormGroup = this.fb.group({
    order_created_by: ['', Validators.required],
    no_of_unit_ordered: ['', Validators.required],
    discount_percentage: ['', Validators.required],
    discount_type: ['', Validators.required],
    amount_recieved: ['', Validators.required],
    final_payment_date: ['', Validators.required],
    custom_fields: new UntypedFormArray([]),
  });

  submittedFirstForm: boolean = false;
  startDate = new Date();
  businessList: any;
  industryList: any;
  productSubCategoryList: any;
  productTypeList: any;
  productSubTypeList: any;
  brandList: any;
  currentUrl: any;
  addSalesOrder: boolean = false;
  editSalesOrder: boolean = false;
  companiesList: any;
  businessActivityList: any;
  productBrandList: any;
  IsaddSalesOrder: boolean = false;
  editPurchaseOrder: boolean = false;
  customfields: any = [];
  submittedSecondForm: boolean = false;
  submittedThirdForm: boolean = false;
  submittedFourthForm: boolean = false;
  dataforEdit: any;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: Router,
    private service: ApiServicesService,
    private toastr: ToastrService,
    public upload: UploadService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.route.url;
    this.activatedRoute.queryParamMap.subscribe(id =>
      this.dataforEdit = id

    );
    if (this.dataforEdit.params.id) {
      this.getSalesOrderDetail(this.dataforEdit.params);
    }
    this.getCompanyList();
    this.getBusinessActivites();
    if (this.currentUrl == '/business/salesorder/add-new-sales-order') {
      this.IsaddSalesOrder = true;
      this.editSalesOrder = false;
    }
    else if (this.currentUrl == '/business/salesorder/edit-sales-order') {
      this.editSalesOrder = true;
      this.IsaddSalesOrder = false;
    }
  }

  validateForm() {
    debugger
    if (this.firstFormGroup.invalid) {
      debugger
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }

  validateSecondForm() {
    if (this.secondFormGroup.invalid) {
      this.submittedSecondForm = true;
    } else {
      this.submittedSecondForm = false;
    }
  }

  validateThirdForm() {
    if (this.taxDetailsFormGroup.invalid) {
      this.submittedThirdForm = true;
    } else {
      this.submittedThirdForm = false;
    }
  }

  validateFourthForm() {
    if (this.productDeliveryFormGroup.invalid) {
      this.submittedFourthForm = true;
    } else {
      this.submittedFourthForm = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    debugger
    let firtsReq = this.firstFormGroup.value;
    let secondReq = this.secondFormGroup.value;
    let taxDetailsFormGroup = this.taxDetailsFormGroup.value;
    let productDeliveryFormGroup = this.productDeliveryFormGroup.value;
    let productManufacturingFormGroup = this.productManufacturingFormGroup.value;
    let otherDetailFormGroup = this.otherDetailFormGroup.value;

    if (this.isOtherSelected) {
      delete this.firstFormGroup.value.company_id;
      this.companyType = "sales";
      // delete this.firstFormGroup.value.company_id
    }
    else {
      this.companyType = "sales";
      delete this.firstFormGroup.value.company_name;
    }
    if(this.isAdd){
      delete this.firstFormGroup.value.initial_id;
    }
    let finalReq = {
      ...firtsReq,
      ...secondReq,
      ...taxDetailsFormGroup,
      ...productDeliveryFormGroup,
      ...productManufacturingFormGroup,
      ...otherDetailFormGroup,
      media: this.files,
      version: 1.1,
      type: this.companyType
      //custom_fields:this.customfields
    }
    console.log("Sales Request====================>" + JSON.stringify(finalReq));
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.taxDetailsFormGroup.valid && this.productDeliveryFormGroup.valid && this.productManufacturingFormGroup.valid) {
      this.service.post(finalReq, API_ROUTES.SalesOrder.createOrderForSales, {}).pipe().subscribe((res => {
        if (res.success) {
          this.resetFrom();
          const dialogRef = this.dialog.open(PostPublishComponent, {
            maxHeight: '100vh',
            width: '465px',
            panelClass: 'payNow',
            data: {
              img: 'assets/images/Completed_check.svg',
              heading: 'Your sales order has been added',
              title: 'Your sales order has been successfully added',
              btn: 'Okay'
            }
          })
        }
      }))
    }
  }

  resetFrom() {
    this.submitted = false;
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.productDeliveryFormGroup.reset();
    this.productManufacturingFormGroup.reset();
    this.otherDetailFormGroup.reset();
    this.taxDetailsFormGroup.reset();
    this.isAdd = true;
  }


  // submitFirstForm() {
  //   if(this.firstFormGroup.valid) {
  //     console.log("Ddd");
  //   }else {
  //     this.submittedFirstForm = true;
  //   }
  // }

  get f() {
    return this.firstFormGroup.controls;
  }

  get f2() {
    return this.secondFormGroup.controls;
  }

  get f3() {
    return this.taxDetailsFormGroup.controls;
  }

  get f4() {
    return this.productDeliveryFormGroup.controls;
  }

  get f5() {
    return this.productManufacturingFormGroup.controls;
  }

  get f6() {
    return this.otherDetailFormGroup.controls;
  }


  getCompanyList() {
    this.service.get({}, `${API_ROUTES.SalesOrder.getCompanyList}`).pipe().subscribe((res) => {
      if (res.success) {
        this.companiesList = res.result.companyDetail;
      } else {

      }
    }
    )
  }
  getBusinessActivites() {

    this.service.get({}, `${API_ROUTES.SalesOrder.getBusinessActivities}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log(JSON.stringify(res.result));
        this.businessActivityList = res.result;
      } else {

      }
    }
    )
  }
  getIndustryList(id: any) {
    this.service.get({}, `${API_ROUTES.SalesOrder.getIndustries + "?industry_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        //console.log("getIndustryList==============>"+JSON.stringify(res.result.rows));
        this.industryList = res.result.rows;
      } else {

      }
    }
    )
  }
  getProductSubCategoryList(id: any) {
    this.service.get({}, `${API_ROUTES.SalesOrder.getProductSubCategoryList + "?category1_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        // console.log("getProductSubCategoryList==============>"+JSON.stringify(res.result));
        this.productSubCategoryList = res.result.rows;
      } else {

      }
    }
    )
  }
  getProductTypeList(id: any) {
    this.service.get({}, `${API_ROUTES.SalesOrder.getProductTypeList + "?category2_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        // console.log("getProductTypeList==============>"+JSON.stringify(res.result));
        this.productTypeList = res.result.rows;
      } else {

      }
    }
    )
  }
  getProductSubTypeList(id: any) {
    this.service.get({}, `${API_ROUTES.SalesOrder.getProductSubTypeList + "?category3_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log("getProductSubTypeList==============>" + JSON.stringify(res.result));
        this.productSubTypeList = res.result.rows;

      } else {

      }
    }
    )
  }
  getBrandList(id: any) {
    this.service.get({}, `${API_ROUTES.SalesOrder.getBrandList + "?category1_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log("getProductSubTypeList==============>" + JSON.stringify(res.result));
        this.productBrandList = res.result.rows;
      } else {

      }
    }
    )
  }
  selectionChange(event: any) {
    debugger
    this.f.email.patchValue('');
    this.f.contact_no.patchValue('');
    this.f.address.patchValue('');
    console.log(event.value);
    if (event) {
      if (event.value.toLowerCase() != "other".toLowerCase()) {
        var filtedData = this.companiesList.filter((x: any) => x.id == event.value)[0];
        if (filtedData != null) {
          this.f.email.patchValue(filtedData.Auth.email);
          this.f.contact_no.patchValue(filtedData.Auth.phone_no);
          this.f.address.patchValue(filtedData.address);
          // this.company_name=filtedData.company_name;
          this.isOtherSelected = false;

        }
        else {

        }
      }
      else {
        this.isOtherSelected = true;
        // this.f.company_id.patchValue(null);
      }

    }
  }
  selectionChangeBusinessActivity(event: any) {
    console.log(event.value);
    if (event) {
      var filtedData = this.businessActivityList.filter((x: any) => x.id == event.value)[0];
      if (filtedData != null) {
        this.getIndustryList(filtedData.id);
      }
      else {

      }
    }
  }
  selectionChangeIndustry(event: any) {
    debugger
    console.log(event.value);
    if (event) {
      var filtedData = this.industryList.filter((x: any) => x.id == event.value)[0];
      if (filtedData != null) {
        this.getProductSubCategoryList(filtedData.id);
        this.getBrandList(filtedData.id);
      } else {

      }

    }
  }
  selectionChangeProductSubcategory(event: any) {
    console.log(event.value);
    if (event) {
      var filtedData = this.productSubCategoryList.filter((x: any) => x.id == event.value)[0];
      if (filtedData != null) {
        this.product_sub_type = filtedData.title;
        this.getProductTypeList(filtedData.id);
      }
      else {

      }
    }
  }
  selectionChangeProductType(event: any) {
    debugger
    console.log(event.value);
    if (event) {
      var filtedData = this.productTypeList.filter((x: any) => x.id == event.value)[0];
      if (filtedData) {
        this.getProductSubTypeList(filtedData.id);
        this.product_type = filtedData.title;
      }
      else {

      }
    }
  }


  fileupload(e: any) {
    if (this.files.length > 5) {
      this.toastr.error("More than 5 files are not allowed")
    }
    else {
      if (this.files.length > 0 && (this.files.length + parseInt(e.target.files.length) > 5)) {
        this.toastr.error("More than 5 files are not allowed")
      }
      else if (e.target.files.length > 5) {
        this.toastr.error("More than 5 files are not allowed")
      }
      else {
        if (e.target.files.length > 1) {
          for (let i = 0; i < e.target.files.length; i++) {
            this.uploadFile(e.target.files[i])
          }

        }
        else {
          const selectedFile = e.target.files[0];
          this.uploadFile(selectedFile);
        }
      }
    }
    return false;

  }

  async uploadFile(selectedFile: any) {
    let uploadedImage: any = await this.upload.uploadFile(selectedFile);
    if (uploadedImage) {
      console.log(uploadedImage);
      let file = {
        'media_type': uploadedImage.type,
        'url': uploadedImage.Location
      }
      // this.files.push(uploadedImage);
      if (uploadedImage.type.toLowerCase().includes('image')) {
        this.images.push(file)
        this.media = this.images;
      }
      else if (uploadedImage.type.toLowerCase().includes('video')) {
        this.videos.push(file)
        this.media = this.videos;
      }
      else {
        this.pdf.push(file)
        this.media = this.videos;
      }
      this.files = [...this.images, ...this.videos, ...this.pdf];
      // this.files.push(uploadedImage);
      return true;
    } else {
      return false;
    }
  }
  get ff() { return this.otherDetailFormGroup.controls; }
  get t() { return this.ff.custom_fields as UntypedFormArray; }
  get customfieldGroups() {
    return this.t.controls as UntypedFormGroup[];
  }
  addFieldPopup() {
    const dialogRef = this.dialog.open(AddFieldComponent, {
      maxHeight: '100vh',
      width: '465px'
    });
    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed', result);
      if (result.data != null) {
        this.customfields.push(result.data);

        console.log(this.customfields);
        this.t.push(
          this.fb.group({
            lable: result.data,
            content: ''
          })
        )
      }
    });
  }

  orderAdded() {
    const dialogRef = this.dialog.open(PostPublishComponent, {
      maxHeight: '100vh',
      width: '465px',
      panelClass: 'payNow',
      data: {
        img: '../.assets/images/Completed_check.svg',
        heading: 'Your purchase order has been added',
        title: 'Please check your inbox and click in the recieved link to reset a password',
        btn: 'Okay'
      }
    })
  }

  // addFieldPopup(){
  //   const dialogRef=this.dialog.open(AddFieldComponent,{
  //     maxHeight: '100vh',
  //     width:'465px',
  //     panelClass:'payNow',
  //     data: {
  //       img:'../.assets/images/Completed_check.svg',
  //       heading:'Your purchase order has been added',
  //       title:'Please check your inbox and click in the recieved link to reset a password',
  //       btn:'Okay'
  //     }
  //   })
  // }

  /**edit*/
  edit(d: any) {
    debugger
    this.isAdd=false;
    this.isReadOnly = true;
    let Addedversion = parseFloat(d.version) + 0.1;
    this.Orderversion = parseFloat(Addedversion.toFixed(1));//parseFloat(parseFloat(d.version)+0.1.toFixed(1));
    this.firstFormGroup.controls.address.patchValue(d.address);
    this.firstFormGroup.controls.email.patchValue(d.email);
    this.firstFormGroup.controls.contact_no.patchValue(d.contact_no);
    if (d.initial_id == null) {
      this.firstFormGroup.controls.initial_id.patchValue(d.id);
    } else {
      this.firstFormGroup.controls.initial_id.patchValue(d.initial_id);
    }

    if (d.company_id == null) {
      this.isOtherSelected = true;
      this.firstFormGroup.controls.company_name.patchValue(d.company_name);
      this.firstFormGroup.controls.company_id.patchValue("Other");
    } else {
      this.firstFormGroup.controls.company_id.patchValue(d.company_id);
    }
    this.secondFormGroup.controls.industry_id.patchValue(d.industry_id);
    this.getIndustryList(d.industry_id);
    this.getProductSubCategoryList(d.category1_id);
    this.getProductTypeList(d.category2_id);
    this.getProductSubTypeList(d.category3_id);
    this.getBrandList(d.category1_id);
    this.secondFormGroup.controls.category1_id.patchValue(d.category1_id);
    this.secondFormGroup.controls.category2_id.patchValue(d.category2_id);
    this.secondFormGroup.controls.category3_id.patchValue(d.category3_id);
    this.secondFormGroup.controls.category4_id.patchValue(d.category4_id);
    this.secondFormGroup.controls.brand_id.patchValue(d.brand_id);
    this.secondFormGroup.controls.hsn_code.patchValue(d.hsn_code);
    this.secondFormGroup.controls.price.patchValue(d.price);
    this.taxDetailsFormGroup.controls.tax_type.patchValue(d.tax_type);
    this.taxDetailsFormGroup.controls.tax_percentage.patchValue(d.tax_percentage);
    this.productDeliveryFormGroup.controls.milestone_name.patchValue(this.purchaseOrderDetailForEdit.milestone_name);
    this.productDeliveryFormGroup.controls.product_delivery_end_date.patchValue(this.purchaseOrderDetailForEdit.product_delivery_end_date);
    this.productDeliveryFormGroup.controls.unit_type.patchValue(this.purchaseOrderDetailForEdit.unit_type);
    this.productDeliveryFormGroup.controls.product_delivery_start_date.patchValue(this.purchaseOrderDetailForEdit.product_delivery_start_date);
    this.productDeliveryFormGroup.controls.number_of_unit.patchValue(this.purchaseOrderDetailForEdit.number_of_unit);
    this.productDeliveryFormGroup.controls.payment_recieved_date.patchValue(this.purchaseOrderDetailForEdit.payment_recieved_date);

    this.productManufacturingFormGroup.controls.manufacturing_milestone_name.patchValue(this.salesManufactureDetailForEdit.manufacturing_milestone_name);
    this.productManufacturingFormGroup.controls.manufacturing_start_date.patchValue(this.salesManufactureDetailForEdit.manufacturing_start_date);
    this.productManufacturingFormGroup.controls.manufacturing_end_date.patchValue(this.salesManufactureDetailForEdit.manufacturing_end_date);
    this.productManufacturingFormGroup.controls.manufacturing_number_of_unit.patchValue(this.salesManufactureDetailForEdit.manufacturing_number_of_unit.toString());
    this.productManufacturingFormGroup.controls.manufacturing_unit_type.patchValue(this.salesManufactureDetailForEdit.manufacturing_unit_type);
    this.productManufacturingFormGroup.controls.manufacturing_payment_recieved_date.patchValue(this.salesManufactureDetailForEdit.manufacturing_payment_recieved_d);

    this.MediaFiles.forEach((element: any) => {
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

    this.otherDetailFormGroup.controls.order_created_by.patchValue(d.order_created_by);
    this.otherDetailFormGroup.controls.no_of_unit_ordered.patchValue(d.no_of_unit_ordered);
    this.otherDetailFormGroup.controls.discount_percentage.patchValue(d.discount_percentage);
    this.otherDetailFormGroup.controls.discount_type.patchValue(d.discount_type);
    this.otherDetailFormGroup.controls.amount_recieved.patchValue(d.amount_recieved);
    this.otherDetailFormGroup.controls.final_payment_date.patchValue(d.final_payment_date);

    this.isAdd = false;
  }
  getSalesOrderDetail(d: any) {
    this.service.get({}, `${API_ROUTES.SalesOrder.SalesOrderDetail + "?salesId=" + d.id + "&type=sales"}`).pipe().subscribe((res) => {
      if (res.success) {
        debugger
        console.log("getSalesOrderDetail==========================================>" + JSON.stringify(res.result));
        this.purchaseOrderDetailForEdit = res.result.ProductDeliveryMilestones[0];
        this.salesManufactureDetailForEdit = res.result.ProductManufacturingMilestones[0];
        this.MediaFiles = res.result.Media;
        this.edit(d);
      } else {

      }
    }
    )
  }

}
