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
import { ActivatedRoute, Router } from '@angular/router';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
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
  updateData: any;
  product:any;
  images: any=[];
  videos: any=[];
  pdf: any=[];
  editFlag: boolean = false;
  editId: any;
  addPage:boolean=true; 
   media: any = [];
  showProductType:boolean = false; 
  showProductSubType:boolean = false;
  ownerShip = ['self owned','rent'];
  hypothecation = ['no','yes'];
  productCondition = ['new','used'];
  emptyFile:boolean=false;

  constructor(private toastr:ToastrService,private router :Router,private commonService:CommonService,
    public upload: UploadService,private loader:NgxUiLoaderService,
    public datepipe :DatePipe, private activeRoute:ActivatedRoute,private dialog:MatDialog,private fb:FormBuilder,private service:ApiServicesService) { 
      this.activeRoute.queryParams.subscribe((params) =>{
        this.editId = params?.['id'];  
      })
  }
 
  ngOnInit(): void {
    if(this.editId && this.editId!= null && this.editId!= " " && this.editId != undefined){
      this.editFlag = true;
    }
    // this.editFlag = this.dataService.getDataByKey('editFlag');
    // this.editId = this.dataService.getDataByKey('editId');

    if(this.editFlag && this.editId){
      this.createForm();
      this.businessActivity()
      this.productDetail(this.editId)
    }
    else {
      this.createForm();
      this.businessActivity()
    }

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
    purchase_year:['',[Validators.required]],
    location:['',[Validators.required]],
    product_condition:['',[Validators.required]],
    description:['',[Validators.required]],
    under_hypothecation:['',[Validators.required]],
    ownership_type:['',[Validators.required]],
    brand_id:['',[Validators.required]],
    country_origin:['',[Validators.required]],
    is_live:['false'],
    product_type:['',[Validators.required]],
    product_sub_type:['',[Validators.required]]

  })
}

  get f() { return this.addForm.controls; }
  
  setData() {
    this.addPage=false
    this.addForm.patchValue({
    category1_id:this.updateData.category1_id,
    category2_id:this.updateData.category2_id,
    industry_id:this.updateData.industry_id,
    category3_id:this.updateData.category3_id,
    category4_id:this.updateData.category4_id,
    price:this.updateData.price,
    manufacturing_place:this.updateData.manufacturing_place,
    purchase_year:this.updateData.purchase_year,
    location:this.updateData.location,
    product_condition:this.updateData.product_condition,
    description:this.updateData.description,
    under_hypothecation:this.updateData.under_hypothecation,
    ownership_type:this.updateData.ownership_type,
    brand_id:this.updateData.brand_id,
    media:this.updateData.media,
    country_origin:this.updateData.country_origin,
    is_live:this.updateData.is_live,
    product_type:this.updateData.product_type,
    product_sub_type:this.updateData.product_sub_type
    })

    let industry={
        "value":this.updateData.industry_id
    }
    this.getIndustry(industry);
    let SubCatagory={
        "value":this.updateData.category1_id
    }
    this.getSubCatagory(SubCatagory);
    let event1={
      value:this.updateData.category2_id
    }
    if(this.updateData.category3_id){
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
      value:this.updateData.category3_id
    }
    if(this.updateData.category4_id){
      this.productsubType(event2)
    } else {
      this.substype = [{id:1,title:'Other'}];
      this.addForm.patchValue({
        category4_id: this.substype[0].id
      })
      this.showProductSubType = true;
    }
    let getbrand={
        "value":this.updateData.category1_id
    }
    this.brand(getbrand)

  }


  productDetail(id:any) {
    let dataToPost = {
      productId: id
    }
    this.service.get(dataToPost, API_ROUTES.Marketplace.productDetails).pipe().subscribe((res => {
      console.log(res);
      
      if (res.success) {
        this.updateData = res.result;
        // this.setData();
        this.setData();
        // this.files = this.updateData.Media
        for(let i=0;i<this.updateData.Media.length;i++){
          let media = {
            'media_type':this.updateData.Media[i].media_type,
            'url': this.updateData.Media[i].url
             }
          if(this.updateData.Media[i].media_type.toLowerCase().includes('image')){
            this.images.push(media)
          }
          else if (this.updateData.Media[i].media_type.toLowerCase().includes('video')){
            this.videos.push(media)
          }
          else {
            this.pdf.push(media)
          }
        } 
        this.files = [...this.images,...this.videos,...this.pdf];
        // this.files.forEach(function(v:any){ delete v.id });
        }
        else {
          // this.toastr.error(res.msg)
        }
        

    }))
  }

  onSubmit(post:any){
    let requestBody:any;
    requestBody= {
      media:this.media,
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
      product_sub_type:post.product_sub_type

    }
    this.submitted = true;
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
    if (this.files.length > 0) {

      console.log(this.files);
      requestBody.media = this.files;
    }
    let purchaseyear=this.datepipe.transform(post.purchase_year,'YYYY/MM/dd');
    console.log(purchaseyear);
    requestBody.purchase_year = purchaseyear,
  
    console.log(post,"addProduct")
    if(this.files.length <=0){
      this.emptyFile = true;
    }
    if (this.addForm.valid && this.files.length <= 0) {
      this.emptyFile = true;
    }
    else if(this.addForm.valid && this.files.length > 0){
      if (this.editFlag) {
        // const dialogRef = this.dialog.open(EditPopupComponent, {
        //   maxHeight: '100vh',
        //   width: '465px',
        //   panelClass: 'yespost',
        //   data: {
        //     img: 'assets/images/Success.png',
        //     heading: 'Are you sure you want to save this Product?',
        //     report: 'Back',
        //     cancel: 'Yes, Save'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            // this.addForm.value.product_id = this.editId
            this.service.put(requestBody, {product_id:this.editId}, API_ROUTES.Marketplace.updateProduct).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Product updated successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/business/productCatalogue']);
              });


            }))
        //   }

        // })




      }
      else {
        // const dialogRef = this.dialog.open(EditPopupComponent, {
        //   maxHeight: '100vh',
        //   width: '465px',
        //   panelClass: 'yespost',
        //   data: {
        //     img: 'assets/images/Success.png',
        //     heading: 'Are you sure you want to post this Product?',
        //     report: 'Back',
        //     cancel: 'Yes, Post'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.service.post(requestBody, API_ROUTES.Marketplace.addProduct, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Product added successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/business/productCatalogue']);
              });

            });
        //   }

        // })
      }
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
    if(event.value != 1 && event.value != null){
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
    /**resetFrom*/
    resetFrom() {
    
      this.submitted = false;
      this.addForm.reset();
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
      selectUser(val: any) {
        if (this.selectDummyUserId.includes(val)) {
          this.selectDummyUserId.splice(this.selectDummyUserId.indexOf(val), 1)
          console.log(this.selectDummyUserId);
              }
        else {
          this.selectDummyUserId.push(val)
          console.log(this.selectDummyUserId)
        }
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