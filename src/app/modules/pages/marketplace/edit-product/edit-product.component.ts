import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { UploadService } from 'src/app/services/upload.service';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productBrand: any;
  business: any;
  industry: any;
  subCatagory: any;
  producttype: any;
  substype: any;
  addForm: any;
  productName: any;
  images: any=[];
  videos: any=[];
  pdf: any=[];
  Media: any[];
  productid: any;
  customfields: any=[];
  files: any=[];
  submitted:boolean = false;
  ownerShip = ['self owned','rent'];
  hypothecation = ['no','yes'];
  productCondition = ['new','used'];
  showProductType:boolean = false;
  showProductSubType:boolean = false;
  emptyFile:boolean=false;

  constructor(private toastr:ToastrService,private router :Router,private commonService:CommonService,
    public upload: UploadService,private loader:NgxUiLoaderService,
    public datepipe :DatePipe, private activeRoute:ActivatedRoute,private dialog:MatDialog,private fb:FormBuilder,private service:ApiServicesService) { 
      this.activeRoute.queryParams.subscribe((params) =>{
        this.productid = params?.['id'];
          })
      
  }
  ngOnInit(): void {
    this.businessActivity()
 this.createForm()
 this.getMachineDetails()
 
  }

  goBack(){
    this.commonService.goBack();
  }

  createForm(){
    this.addForm=this.fb.group({
      category1_id:['',Validators.required],
      category2_id:['',Validators.required],
      industry_id:['',Validators.required],
      category3_id:['',Validators.required],
      category4_id:['',Validators.required],
      price:['',Validators.required],
      manufacturing_place:['',Validators.required],
      purchase_year:['',Validators.required],
      location:['',Validators.required],
      product_condition:['',Validators.required],
      description:['',Validators.required],
      under_hypothecation:['',Validators.required],
      ownership_type:['',Validators.required],
      custom_fields: new UntypedFormArray([],Validators.required),
      brand_id:['',Validators.required],
      country_origin:['',Validators.required],
      product_type:['',Validators.required],
      product_sub_type: ['',Validators.required],
      is_live:['true']
    })
  }
  get f() { return this.addForm.controls; }
  get t() { return this.f.custom_fields as UntypedFormArray; }

  businessActivity(){
    this.service.get({},`${API_ROUTES.Marketplace.businessActivity}`).pipe().subscribe((res)=>{
      this.business = res.result;
      console.log(this.business)
    })
  }
  getIndustry(event:any){
    let industry = {
      industry_id:event.value
    }
    this.service.get(industry,`${API_ROUTES.Marketplace.catagory_1}`).pipe().subscribe((res)=>{
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
    if(event.value != null || event.value != 1){
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


  patchData() {
    this.addForm.patchValue({
      media:this.productName.Media,
      category1_id:this.productName.category1_id,
      category2_id:this.productName.category2_id,
      industry_id:this.productName.industry_id,
      category3_id:this.productName.category3_id,
      category4_id:this.productName.category4_id,
      price:this.productName.price,
      manufacturing_place:this.productName.manufacturing_place,
      purchase_year:this.productName.purchase_year,
      location:this.productName.location,
      product_condition:this.productName.product_condition,
      description:this.productName.description,
      under_hypothecation:this.productName.under_hypothecation,
      ownership_type:this.productName.ownership_type,
      // custom_fields: new UntypedFormArray([]),
      brand_id:this.productName.brand_id,
      country_origin:this.productName.country_origin,
      product_type:this.productName.product_type,
      product_sub_type:this.productName.product_sub_type,
      is_live:true

  
    });

    this.setCustomfields();
    let industry = {
      value:this.productName.industry_id
    }
    this.getIndustry(industry);
    let event = {
      value:this.productName.category1_id
    }
    this.getSubCatagory(event);

    let event1={
      value:this.productName.category2_id
    }
    if(this.productName.category3_id){
      this.productTypes(event1);
    }
    else {
      this.producttype = [{id:1,title:'Other'}];
      this.addForm.patchValue({
        category3_id:this.producttype[0].id
      })
      this.showProductType = true;
    }
    let event2 = {
      value:this.productName.category3_id
    }
    if(this.productName.category4_id){
      this.productsubType(event2)
    } else {
      this.substype = [{id:1,title:'Other'}];
      this.addForm.patchValue({
        category4_id: this.substype[0].id
      })
      this.showProductSubType = true;
    }

    let event3={
      value:this.productName.category1_id
    }
    this.brand(event3)
  }

  setCustomfields() {
    if (this.productName.CustomFields.length > 0) {
      for (let i = 0; i < this.productName.CustomFields.length; i++) {
        this.customfields.push(this.productName.CustomFields[i].lable_name)
        this.t.push(
          this.fb.group({
            lable: this.productName.CustomFields[i].lable_name,
            content: this.productName.CustomFields[i].content
          })
        )
      }
    }
  }
  
  getMachineDetails(){
    this.service.get({productId:this.productid},`${API_ROUTES.Marketplace.productDetails}`).pipe().subscribe((res)=>{
      this.productName = res.result
      console.log(this.productName);
        this.patchData();
        if (res.success) {
          this.productName = res.result
          for(let i=0;i<this.productName.Media.length;i++){
            let upload = {
              url: this.productName.Media[i].url,
              media_type: this.productName.Media[i].media_type
            }
            if(this.productName.Media[i].media_type.toLowerCase().includes('image')){
              this.images.push(upload)
            }
            else if (this.productName.Media[i].media_type.toLowerCase().includes('video')){
              this.videos.push(upload)
            }
            else {
              this.pdf.push(upload)
            }
          } 
          this.files = [...this.images,...this.videos,...this.pdf];
        console.log(this.images);
        } else {
          // this.toastr.error(res.msg)
        }
        
    })
  }

  onSubmit(data:any){
    this.submitted = true;
   
     let purchaseyear=this.datepipe.transform(data.purchase_year,'YYYY/MM/dd');
     console.log(purchaseyear);
     data.purchase_year = purchaseyear,
   data.media=this.files
   if(this.showProductType){
    delete data['category3_id'];
  } else {
    delete data['product_type'];
    this.addForm.removeControl('product_type');
  }
  if(this.showProductSubType){
    delete data['category4_id'];
  } else {
    delete data['product_sub_type'];
    this.addForm.removeControl('product_sub_type');
  }
  if(this.files.length <=0){
    this.emptyFile = true;
  }
   console.log(data, '===>')
   if(this.addForm.valid && this.files.length <=0){
    this.emptyFile = true;
   }
  //  else if(this.addForm.valid && this.files.length > 0){
    this.service.put( data,{product_id:this.productid},`${API_ROUTES.Marketplace.updateProduct}`).pipe().subscribe((response)=>{
      if(response.success_code==200){
       const dialogRef = this.dialog.open(EditPopupComponent, {
         maxHeight: '100vh',
         width:'465px',
         panelClass:'yespost',
         data: {
           img:'assets/images/Success.png',
           heading:'Are you sure you want to update this product?',
          //  para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
           report:'Back',
           cancel:'Yes, Post'
         }
       });
       dialogRef.afterClosed().subscribe((confirm: any) => {
         if (confirm !== undefined && confirm !== null && confirm) {
           const dialogRef = this.dialog.open(PostPublishComponent, {
             maxHeight: '100vh',
             width:'465px',
             panelClass:'products',
             data: {
               img:'assets/images/Success.png',
               heading:'Product updated successfully',
               title:'Your product has been successfully added',
               btn:'Okay'
             }
             
           }
           );
           dialogRef.afterClosed().subscribe(result => {
             
             this.router.navigate(['/main/myMarketplace'])
           });
          
         }
       });   
       }
 
    })
   
   
}

fileupload(e: any,data:any) {
  
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
      this.images.push(file)
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

addfield() {
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
getCustomFieldControls() {
  return this.addForm.controls.custom_fields.controls;
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
 }

