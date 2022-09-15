import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
//import { MatPaginator, MatDialog, MatDatepickerInputEvent, MatInput } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-new-purchase-order',
  templateUrl: './add-new-purchase-order.component.html',
  styleUrls: ['./add-new-purchase-order.component.scss']
})
export class AddNewPurchaseOrderComponent implements OnInit {
  itras: any = ['name', 'surname'];
  isEditable = false;
  isReadOnly=false;
  isOtherSelected = false;
  companyType:any;
  purchaseOrderDetailForEdit:any
  MediaFiles:any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  array_name = ["gst"]
  unitType = ["KG"]
  filterObj: any = {};
  files: any = [];
  images: any = [];
  videos: any = [];
  pdf: any = [];
  media: any = [];
  submitted = false;
  isAdd = true;
  //type: any;
  // phoneNumber: any;
  // company_name: any;
  // email: any;
  // contact_no: any;
  // address: any;
  // category1_id: any;
  // category2_id: any;
  // category3_id: any;
  // category4_id: any;
  // industry_id: any;
  // brand_id: any;
  product_type: any;
  product_sub_type: any;
  // hsn_code: any;
  // tax_type: any;
  // tax_percentage: any;
  // product_delivery_start_date: any;
  // product_delivery_end_date: any;
  // number_of_unit: any;
  // unit_type: any;
  // payment_recieved_date: any;
  // order_created_by: any;
  // milestone_name: any;
  // discount_percentage: any;
  // discount_type: any;
  // amount_recieved: any;
  // final_payment_date: any;
  // no_of_unit_ordered: any;
  // type: any;
  // initial_id: any;
   Orderversion=1.1;
  // price: any;
  namePattern = "[a-zA-Z ]+";
  gstPattern = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$";
  panPattern = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
  numberPattern = "[\\d+(?:\\.\\d+)]+";
  digitPattern = "[0-9]+"
  hsnPattern = "[0-9]{6,8}"
  // percentPattern = "\\d+(?:\\.\\d+)?%"
  range = {
    fromDate: new Date(),
    toDate: new Date()
  }
  //ffirstFormGroup: FormGroup;
  firstFormGroup = this.fb.group({
    company_id: ['',null],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    contact_no: ['', [Validators.required, Validators.pattern(/[0-9]{10}/)]],
    address: ['', Validators.required],
    company_name: [null],
    initial_id:[null]
  });
  secondFormGroup = this.fb.group({
    industry_id: ['', Validators.required],
    category1_id: ['', Validators.required],
    category2_id: ['', Validators.required],
    category3_id: ['', Validators.required],
    category4_id: ['', Validators.required],
    brand_id: ['', Validators.required],
    hsn_code: ['', [Validators.required, Validators.pattern(this.hsnPattern)]],
    price: ['', [Validators.required, Validators.pattern(this.digitPattern)]],
  });
  taxDetailsFormGroup = this.fb.group({
    tax_type: ['', Validators.required],
    tax_percentage: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
  });
  productDeliveryFormGroup = this.fb.group({
    milestone_name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    product_delivery_start_date: ['', Validators.required],
    product_delivery_end_date: ['', Validators.required],
    number_of_unit: ['', [Validators.required, Validators.pattern(this.digitPattern)]],
    unit_type: ['', Validators.required],
    payment_recieved_date: ['', Validators.required],
  });
  productManufacturingFormGroup = this.fb.group({
    secondCtrl: [''],
  });
  otherDetailFormGroup = this.fb.group({
    order_created_by: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    no_of_unit_ordered: ['', [Validators.required, Validators.pattern(this.digitPattern)]],
    discount_percentage: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
    discount_type: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    amount_recieved: ['', [Validators.required, Validators.pattern(this.digitPattern)]],
    final_payment_date: ['', [Validators.required, Validators.pattern(this.digitPattern)]],
    custom_fields: new UntypedFormArray([]),
  });

  startDate = new Date();
  currentUrl: any;
  companiesList: any;
  businessActivityList: any;
  industryList: any;
  productSubCategoryList: any;
  productTypeList: any;
  productSubTypeList: any;
  productBrandList: any;
  IsaddPurchaseOrder: boolean = false;
  editPurchaseOrder: boolean = false;
  customfields: any = [];
  dataforEdit:any;
  submittedFirstForm: boolean = false;
  submittedSecondForm: boolean = false;
  submittedThirdForm: boolean = false;
  submittedFourthForm: boolean = false;
  submittedFifthForm: boolean = false;
  selectFiles: boolean = false;
  maxFileAllowed: boolean = false;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: Router,
    private service: ApiServicesService,
    private toastr: ToastrService,
    public upload: UploadService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    debugger
    this.currentUrl = this.route.url;
    this.activatedRoute.queryParamMap.subscribe(id =>
      this.dataforEdit=id
      
      );
      if(this.dataforEdit.params.id){
        this.getPurchaseOrderDetail(this.dataforEdit.params);
      }
    //this.activatedRoute.queryParamMap.subscribe(param=>)
    this.getCompanyList();
    this.getBusinessActivites();
    // this.createForm();
    if (this.currentUrl == '/business/purchase-order-request/add-purchase-order') {
      this.IsaddPurchaseOrder = true;
      this.editPurchaseOrder = false;
    }
    else if (this.currentUrl == 'business/purchase-order-request/edit-purchase-order') {
      this.editPurchaseOrder = true;
      this.IsaddPurchaseOrder = false;
    }
  }

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
    return this.otherDetailFormGroup.controls;
  }

  validateForm() {
    debugger
    if(this.firstFormGroup.invalid) {
      debugger
      this.submitted = true;
    }else {
      this.submitted = false;
    }
  }

  validateSecondForm() {
    if(this.secondFormGroup.invalid) {
      this.submittedSecondForm = true;
    }else {
      this.submittedSecondForm = false;
    }
  }

  validateThirdForm() {
    if(this.taxDetailsFormGroup.invalid) {
      this.submittedThirdForm = true;
    }else {
      this.submittedThirdForm = false;
    }
  }

  validateFourthForm() {
    if(this.productDeliveryFormGroup.invalid) {
      this.submittedFourthForm = true;
    }else {
      this.submittedFourthForm = false;
    }
  }

  validateFifthForm() {
    if(this.otherDetailFormGroup.invalid) {
      this.submittedFifthForm = true;
    }else {
      this.submittedFifthForm = false;
    }

    if(this.files.length <= 0){
      this.selectFiles = true;
    }
  }


  onSubmit() {
    this.submitted = true;
    this.validateFifthForm();
    debugger
    let firtsReq = this.firstFormGroup.value;
    let secondReq = this.secondFormGroup.value;
    let taxDetailsFormGroup = this.taxDetailsFormGroup.value;
    let productDeliveryFormGroup = this.productDeliveryFormGroup.value;
    let otherDetailFormGroup = this.otherDetailFormGroup.value;

    if (this.isOtherSelected) {
     delete this.firstFormGroup.value.company_id;
     this.companyType="other";
    // delete this.firstFormGroup.value.company_id
    }
    else{
      this.companyType="purchase";
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
      ...otherDetailFormGroup,
      media: this.files,
      version: this.Orderversion,
      type: this.companyType
      //custom_fields:this.customfields
    }

    if(this.otherDetailFormGroup.invalid) {
      this.validateFifthForm();
    }


      console.log("Request====================>" + JSON.stringify(finalReq));
     
      if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.taxDetailsFormGroup.valid && this.productDeliveryFormGroup.valid && this.otherDetailFormGroup.valid) {
        this.service.post(finalReq, API_ROUTES.PurchaseOrder.createOrderForPurchase, {}).pipe().subscribe((res => {
          
          if (res.success) {
            this.resetFrom();
            const dialogRef = this.dialog.open(PostPublishComponent, {
              maxHeight: '100vh',
              width: '465px',
              panelClass: 'payNow',
              data: {
                img: 'assets/images/Completed_check.svg',
                heading: 'Your purchase order has been added',
                title: 'Your purchase order has been successfully added',
                btn: 'Okay'
              }
            })
          }
          else{
            this.toastr.error(res.message);
          }
        }))
      }   
  }

    /**edit*/
    edit(d:any) {
      debugger
      this.isReadOnly=true;
      let Addedversion=parseFloat(d.version)+0.1;
      this.Orderversion=parseFloat(Addedversion.toFixed(1));//parseFloat(parseFloat(d.version)+0.1.toFixed(1));
      this.firstFormGroup.controls.address.patchValue(d.address);
      this.firstFormGroup.controls.email.patchValue(d.email);
      this.firstFormGroup.controls.contact_no.patchValue(d.contact_no);
      if(d.initial_id==null){
        this.firstFormGroup.controls.initial_id.patchValue(d.id);
      }else{
        this.firstFormGroup.controls.initial_id.patchValue(d.initial_id);
      }
    
      if(d.company_id==null){
        this.isOtherSelected=true;
        this.firstFormGroup.controls.company_name.patchValue(d.company_name);
        this.firstFormGroup.controls.company_id.patchValue("Other");
      }else{
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
      this.MediaFiles.forEach((element:any) => {
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

    getPurchaseOrderDetail(d:any) {
      this.service.get({}, `${API_ROUTES.PurchaseOrder.PurchaseOrderDetail+"?purchaseId="+d.id}`).pipe().subscribe((res) => {
        if (res.success) {
          debugger
          this.purchaseOrderDetailForEdit = res.result.ProductDeliveryMilestones[0];
          this.MediaFiles=res.result.Media;
          this.edit(d);
        } else {
  
        }
      }
      )
    }

  getCompanyList() {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.getCompanyList}`).pipe().subscribe((res) => {
      if (res.success) {
        this.companiesList = res.result.companyDetail;
      } else {

      }
    }
    )
  }
  getBusinessActivites() {

    this.service.get({}, `${API_ROUTES.PurchaseOrder.getBusinessActivities}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log(JSON.stringify(res.result));
        this.businessActivityList = res.result;
      } else {

      }
    }
    )
  }
  getIndustryList(id: any) {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.getIndustries + "?industry_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        //console.log("getIndustryList==============>"+JSON.stringify(res.result.rows));
        this.industryList = res.result.rows;
      } else {

      }
    }
    )
  }
  getProductSubCategoryList(id: any) {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.getProductSubCategoryList + "?category1_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        // console.log("getProductSubCategoryList==============>"+JSON.stringify(res.result));
        this.productSubCategoryList = res.result.rows;
      } else {

      }
    }
    )
  }
  getProductTypeList(id: any) {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.getProductTypeList + "?category2_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        // console.log("getProductTypeList==============>"+JSON.stringify(res.result));
        this.productTypeList = res.result.rows;
      } else {

      }
    }
    )
  }
  getProductSubTypeList(id: any) {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.getProductSubTypeList + "?category3_id=" + id}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log("getProductSubTypeList==============>" + JSON.stringify(res.result));
        this.productSubTypeList = res.result.rows;

      } else {

      }
    }
    )
  }
  getBrandList(id: any) {
    this.service.get({}, `${API_ROUTES.PurchaseOrder.getBrandList + "?category1_id=" + id}`).pipe().subscribe((res) => {
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
    if(this.files.length > 0){
      this.selectFiles = false;
    }

    if (this.files.length > 5) {
      this.maxFileAllowed = true;
      this.toastr.error("More than 5 files are not allowed")
      console.log("ssss");
    }
    else {
      if (this.files.length > 0 && (this.files.length + parseInt(e.target.files.length) > 5)) {
        this.maxFileAllowed = true;
        this.toastr.error("More than 5 files are not allowed")
        console.log("pppp");
      }
      else if (e.target.files.length > 5) {
        this.maxFileAllowed = true;
        this.toastr.error("More than 5 files are not allowed")
        console.log("ttt");
      }
      else {
        this.maxFileAllowed = false;
        if (e.target.files.length > 1) {
          console.log("llll");
          for (let i = 0; i < e.target.files.length; i++) {
            this.uploadFile(e.target.files[i])
          }

        }
        else {
          console.log("qqq");
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

  onFileDropped(file: any) {
    if (this.files.length > 5) {
      this.toastr.error("More than 5 files are not allowed")
    }
    else {
      if (this.files.length > 0 && (this.files.length + parseInt(file.length) > 5)) {
        this.toastr.error("More than 5 files are not allowed")
      }
      else if (file.length > 5) {
        this.toastr.error("More than 5 files are not allowed")
      }
      else {
        if (file.length > 1) {
          for (let i = 0; i < file.length; i++) {
            this.uploadFile(file[i])
          }

        }
        else {
          const selectedFile = file[0];
          this.uploadFile(selectedFile);
        }
      }
    }
    return false;
    // for (let i = 0; i < file.length; i++) {
    //   this.files.push(file[i].name);
    // }
    // console.log(this.files);

  }

  deleteImg(index:any,type:any){
    // console.log(type);
    
    // let deletedImage: any = await this.upload.deleteFile(file);
    if(type == '1'){
      this.images.splice(index,1);
    }
    else if(type == '2'){
      this.videos.splice(index,1);
    }
    else {
      this.pdf.splice(index,1);
    }
    this.files = [...this.images,...this.videos,...this.pdf];
    console.log(this.files);
    
    
  }

  get ff() { return this.otherDetailFormGroup.controls; }
  get t() { return this.ff.custom_fields as UntypedFormArray; }
  get customfieldGroups() {
    return this.t.controls as UntypedFormGroup[];
  }
  addFieldPopup() {
    const dialogRef = this.dialog.open(AddFieldComponent, {
      maxHeight: '100vh',
      width: '550px'
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
  /**resetFrom*/
  resetFrom() {
    this.submitted = false;
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.productDeliveryFormGroup.reset();
    this.otherDetailFormGroup.reset();
    this.taxDetailsFormGroup.reset();
    this.isAdd = true;
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

  addressChars(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode === 47 || charCode === 32 || charCode === 45 || charCode == 13)
      return true;
    else
      return false;
   
  }
}
