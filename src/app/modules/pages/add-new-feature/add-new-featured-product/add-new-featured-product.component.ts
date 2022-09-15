import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { UploadService } from 'src/app/services/upload.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-add-new-featured-product',
  templateUrl: './add-new-featured-product.component.html',
  styleUrls: ['./add-new-featured-product.component.scss']
})
export class AddNewFeaturedProductComponent implements OnInit {
  addPage:boolean=true;
countnumber:any="";
contentform:any;
myForm: FormGroup;
submitted = false;
media:any=[];
Highlights:any[];
editFlag:boolean=false;
images: any=[];
videos: any=[];
pdf: any=[];
emptyFile:boolean= true;
submitted_1:boolean=false
  editId: any;
  updateData: any;
  files:any=[]
constructor(private fb:FormBuilder,
  private dialog :MatDialog,
  public upload: UploadService,
  private toastr:ToastrService,
  private service:ApiServicesService,
  private router: Router,
  private activeRoute:ActivatedRoute,
  private commonService:CommonService

  ) {
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
    this.getMachineDetails(this.editId);
  }
  else {
    this.createForm();
  }
}
get f() { return this.myForm.controls; }
 /**createForm*/
 createForm() {
  this.submitted = false;

  this.myForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    highlights: this.fb.array([this.createHighLightForm()],[Validators.required]),
    

   })

}

createHighLightForm(){
  return this.fb.group({
    highlight_desc: ['', [Validators.required]]
  })
}

get t(): FormArray {
  return this.myForm.get('highlights') as FormArray;
}

addHighLights(){
  if(this.t.length < 5){
    let item = this.createHighLightForm()
    // this.t.push(new FormControl('',Validators.required))
    this.t.push(item)
  }
  
  // this.tags.push(new FormControl('',Validators.required));
}

removeHighLights(index:any){
  this.t.removeAt(index);
}

setData() {
  this.submitted_1 = false;
  this.emptyFile=false;
  this.addPage=false
  this.myForm.patchValue({
    title:this.updateData.title,
    description:this.updateData.description

  });
  this.t.controls[0].get('highlight_desc')?.patchValue(this.updateData.Highlights[0].highlight_desc);
  for(let i=1; i<this.updateData.Highlights.length;i++){
    if(this.updateData.Highlights.length > 1){
      let item = this.fb.group({
        highlight_desc: [this.updateData.Highlights[i].highlight_desc, [Validators.required]]
      })
      this.t.push(item);
    }
  }
}

  onSubmit(data:any){
    var requestBody= {
      media:this.files,
      highlights:data.highlights,
      title:  data.title,
      description: data.description,
  }
  if (this.files.length > 0) {
    console.log(this.files);
    requestBody.media = this.files;

  }
  
  if(this.files.length <=0){
    this.emptyFile = true;
  }
  if(this.myForm.valid && this.files.length <=0){
    this.emptyFile = true;
   }
    this.submitted = true;
    this.submitted_1 = true;

    if (this.myForm.valid ) {
      if (this.editFlag) {
        // const dialogRef = this.dialog.open(EditPopupComponent, {
        //   maxHeight: '100vh',
        //   width: '465px',
        //   panelClass: 'yespost',
        //   data: {
        //     img: 'assets/images/addpost.png',
        //     heading: 'Are you sure you want to save this Product?',
        //     report: 'Back',
        //     cancel: 'Yes, Save'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.service.put(requestBody,{productId:this.editId}, API_ROUTES.FeatureProduct.productupdate).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Product updated successfully',
                  btn: 'Okay'
                }
              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/profile/products'])
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
        //     img: 'assets/images/addpost.png',
        //     heading: 'Are you sure you want to post this Product?',
        //     report: 'Back',
        //     cancel: 'Yes, Post'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
          // if (result == true) {
            this.service.post(requestBody, API_ROUTES.FeatureProduct.addProduct, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Product added successfully',
                  btn: 'Okay'
                }
              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/profile/products'])
              });

            });
          // }

        // })
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

/**resetFrom*/
resetFrom() {
  
  this.submitted = false;

  this.myForm.reset();
}

getMachineDetails(id:any){
  let dataToPost = {
    productId: id
  }
  this.service.get(dataToPost,`${API_ROUTES.FeatureProduct.productDetails}`).pipe().subscribe((res)=>{
      if (res.success) {
        this.updateData = res.result;
        this.setData();
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
  })
}   

goBack(){
  this.commonService.goBack();
}
    
}
