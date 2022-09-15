import { Component, OnInit } from '@angular/core';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
// import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { DatePipe } from '@angular/common';
import { UntypedFormArray,} from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import {MatDatepicker} from '@angular/material/datepicker';
// import { Moment } from 'moment';
// import moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
  providers: [DatePipe,
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    // },

    // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})
export class AddNewProductComponent implements OnInit {
  addForm: any;
  submitted = false;
  catagory:any
  data: any;
  instrudata: any;
  subCatagory: any;
  industry: any;
  id: any;
  productId: any;
  business: any;
  producttype: any;
  productsubtype: any;
  productBrand: any;
  subsubtype: any;
  substype: any;
  modeSelect: string;
  files:any = [];
  selectDummyUserId: any;
  customfields: any = [];
  updateData: any;
  product:any;
  Media:any=[];
  images: any = [];
  videos: any = [];
  pdf: any = [];
  ownerShip = ['self owned','rent'];
  hypothecation = ['no','yes'];
  productCondition = ['new','used'];
  showProductType:boolean = false;
  showProductSubType:boolean = false;
  emptyFile:boolean= false;

  constructor(private toastr:ToastrService,private router :Router,private commonService:CommonService,
    public upload: UploadService,private loader:NgxUiLoaderService,
    public datepipe :DatePipe, private activeRoute:ActivatedRoute,private dialog:MatDialog,private fb:FormBuilder,private service:ApiServicesService) { 
  }
 
  ngOnInit(): void {
  this.businessActivity()
 this.createForm()
  }

  goBack(){
    this.commonService.goBack();
  }

createForm(){
  this.addForm=this.fb.group({
    category1_id:['',[Validators.required]],
    category2_id:['',[Validators.required]],
    industry_id:['',[Validators.required]],
    category3_id:['',[Validators.required]],
    category4_id:['',[Validators.required]],
    price:['',[Validators.required]],
    manufacturing_place:['',[Validators.required]],
    // purchase_year:new FormControl(moment(),Validators.required),
    purchase_year:['',Validators.required],
    location:['',[Validators.required]],
    product_condition:['',[Validators.required]],
    description:['',[Validators.required]],
    under_hypothecation:['',[Validators.required]],
    ownership_type:['',[Validators.required]],
    custom_fields: new UntypedFormArray([]),
    brand_id:['',[Validators.required]],
    country_origin:['',[Validators.required]],
    product_type:['',[Validators.required]],
    product_sub_type: ['',[Validators.required]],
    is_live:['true']

  })
}
  openpostModal(){
   
  }
  get f() { return this.addForm.controls; }
  // purchase_year = new FormControl(moment());
  // setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.addForm.value['purchase_year']!;
  //   ctrlValue.month(normalizedMonthAndYear.month());
  //   ctrlValue.year(normalizedMonthAndYear.year());
  //   this.addForm.patchValue({purchase_year:ctrlValue});
  //   datepicker.close();
  // }

 
  onSubmit(post:any){
    let requestBody:any;
    requestBody= {
      media:  this.files,
      custom_fields:post.custom_fields,
      category1_id:post.category1_id,
      category2_id:post.category2_id,
      industry_id:post.industry_id,
      category3_id:post.category3_id,
      category4_id:post.category4_id,
      price:post.price,
      manufacturing_place:post.manufacturing_place,
      purchase_year:post.purchase_year,
      location:post.location,
      product_condition:post.product_condition,
      description:post.description,
      under_hypothecation:post.under_hypothecation,
      ownership_type:post.ownership_type,
      brand_id:post.brand_id,
      country_origin:post.country_origin,
      product_type:post.product_type,
      product_sub_type:post.product_sub_type,
      is_live:post.is_live
    }
    if(this.showProductType){
      delete requestBody['category3_id'];
    } else {
      delete requestBody['product_type'];
      this.addForm.removeControl('product_type');
    }
    if(this.showProductSubType){
      delete requestBody['category4_id'];
    } else {
      delete requestBody['product_sub_type'];
      this.addForm.removeControl('product_sub_type');
    }
    this.submitted = true;
    let purchaseyear=this.datepipe.transform(post.purchase_year,'YYYY/MM/dd');
    console.log(purchaseyear);
    requestBody.purchase_year = purchaseyear,
    console.log(post,"addProduct")
    if(this.files.length <=0){
      this.emptyFile = true;
    }
    if(this.addForm.valid && this.files.length <=0){
      this.emptyFile = true;
     }
    else if(this.addForm.valid && this.files.length > 0){
      this.submitted = false;
      const dialogRef = this.dialog.open(EditPopupComponent, {
        maxHeight: '100vh',
        width:'465px',
        panelClass:'yespost',
        data: {
          img:'assets/images/Success.png',
          heading:'Are you sure you want to post this product?',
          // para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
          report:'Back',
          cancel:'Yes, Post'
        }
      });
      dialogRef.afterClosed().subscribe((confirm: any) => {
        if (confirm !== undefined && confirm !== null && confirm) {
          this.service.post(requestBody,`${API_ROUTES.Marketplace.addProduct}`,{}).pipe().subscribe(response => {
            if (response.success_code=200) {
            let id=response.result.product.id
            const dialogRef = this.dialog.open(PostPublishComponent, {
              maxHeight: '100vh',
              width:'465px',
              panelClass:'products',
              data: {
                img:'assets/images/Success.png',
                heading:'Product added successfully',
                // title:'Your product has been successfully added',
                btn:'Okay'


              }
              
            }
            );
            dialogRef.afterClosed().subscribe(result => {
              
              console.log('The dialog was closed', result);
              this.router.navigate(['/main/marketplace'],{queryParams:{id:id}})
            });
      
            } 
          })
          
         
        }
      });
    }
    
        
       
       
    
  
  }
  businessActivity(){
    this.service.get({},`${API_ROUTES.Marketplace.businessActivity}`).pipe().subscribe((res)=>{
      this.business = res.result;
      console.log(this.business)
    })
  }
  getIndustry(event:any){
    this.service.get({industry_id:event.value},`${API_ROUTES.Marketplace.catagory_1}`).pipe().subscribe((res)=>{
      this.industry = res.result.rows;
      console.log(this.industry)
    })
  }
  getSubCatagory(event:any){
    this.service.get({category1_id:event.value},`${API_ROUTES.Marketplace.catagory_2}`).pipe().subscribe((res)=>{
      this.subCatagory = res.result.rows;
      console.log(this.subCatagory)
    })
  }
  productTypes(event:any){
    this.service.get({category2_id:event.value},`${API_ROUTES.Marketplace.catagory_3}`).pipe().subscribe((res)=>{
      this.producttype = res.result.rows;
      if(this.producttype.length <= 0){
        this.producttype = [{id:1,title:'Other'}];
      }
      console.log(this.producttype)
    })
  }
  productsubType(event:any){
    if(event.value != 1){
      this.service.get({category3_id:event.value},`${API_ROUTES.Marketplace.catagory_4}`).pipe().subscribe((res)=>{
        this.substype = res.result.rows;
        if(this.substype.length <= 0){
          this.substype = [{id:1,title:'Other'}];
        }
        console.log(this.substype)
      })
    }
    else {
      this.substype = [{id:1,title:'Other'}];
      this.showProductType = true;
    }
    
  }

  selectProductSubType(event:any){
    if(event.value == 1){
      this.showProductSubType = true;
    }
  }
  brand(event:any){
    this.service.get({category1_id:event.value},`${API_ROUTES.Marketplace.brand}`).pipe().subscribe((res)=>{
      this.productBrand = res.result.rows;
      console.log(this.productBrand)
    })
  }

  fileupload(e: any) {
  
    if(this.files.length >5){
      this.toastr.error("More than 5 files are not allowed")
    }
    else {
      if(this.files.length > 0 && (this.files.length + parseInt(e.target.files.length) > 5)){
        this.toastr.error("More than 5 files are not allowed")
      }
      else{
        if(e.target.files.length>1){
          for(let i=0; i<e.target.files.length;i++){
            this.uploadFile(e.target.files[i])
          }
         
        }
        else{
          const selectedFile = e.target.files[0];
          this.uploadFile(selectedFile);
         
        }
      }
    }
    return false;
  
  }
  
  async uploadFile(selectedFile : any){
    let uploadedImage:any = await this.upload.uploadFile(selectedFile);
    if (uploadedImage) {
      this.emptyFile = false;
      console.log(uploadedImage);
      let file = {
        'media_type': uploadedImage.type,
        'url': uploadedImage.Location
      }
      // this.files.push(uploadedImage);
      if(uploadedImage.type.toLowerCase().includes('image')){
        // let b = this.getImageDimenstion(file.url);
        // console.log(b);
        
        this.images.push(file)

        console.log(this.images[0].url);
        
      }
      else if (uploadedImage.type.toLowerCase().includes('video')){
        this.videos.push(file)
      }
      else {
        this.pdf.push(file)
      }
      this.files = [...this.images,...this.videos,...this.pdf];
      // this.files.push(uploadedImage);
      return true;
    } else {
      return false;
    }
  }

  // getImageDimenstion(imgUrl: any) {
  //   let img = new Image();

  //   img.src = imgUrl;
  //   img.onload = function (event) {
  //     let loadedImage = event.currentTarget as HTMLImageElement;
  //     let x = loadedImage.height;
  //     let y = loadedImage.width;
  //     console.log('height: '+x);
  //     console.log('width' ,y);
  //     let a = {
  //       imgUrl
  //     }
  //     let obj = {
  //       height: x,
  //       width:y
  //     }
  //     return obj;
      
  //   }
  // }
  
  /**resetFrom*/
  resetFrom() {
    
    this.submitted = false;
    this.addForm.reset();
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
      // selectUser(val: any) {
      //   if (this.selectDummyUserId.includes(val)) {
      //     this.selectDummyUserId.splice(this.selectDummyUserId.indexOf(val), 1)
      //     console.log(this.selectDummyUserId);
      //         }
      //   else {
      //     this.selectDummyUserId.push(val)
      //     console.log(this.selectDummyUserId)
      //   }
      // }

      get t() { return this.f.custom_fields as UntypedFormArray; }
      get customfieldGroups() {
        return this.t.controls as UntypedFormGroup[];
      }
      addfield() {
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
     
      getCustomFieldControls() {
        return this.addForm.controls.custom_fields.controls;
      }
      setCustomfields() {
        if (this.updateData.CustomFields.length > 0) {
          for (let i = 0; i < this.updateData.CustomFields.length; i++) {
            this.t.push(
              this.fb.group({
                lable: this.updateData.CustomFields[i].lable,
                content: this.updateData.CustomFields[i].content
              })
            )
          }
        }
      }
      

      
}
