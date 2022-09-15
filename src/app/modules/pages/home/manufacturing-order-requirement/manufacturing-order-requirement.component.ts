import { Component, OnInit } from '@angular/core';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
// import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manufacturing-order-requirement',
  templateUrl: './manufacturing-order-requirement.component.html',
  styleUrls: ['./manufacturing-order-requirement.component.scss']
})
export class ManufacturingOrderRequirementComponent implements OnInit {
  mor_form: any;
  submitted: boolean = false;
  imageUrl: any;
  files: any = [];
  imageName: any;
  media: any = [];
  customfields: any = [];
  industrylist: any = [];
  category1List: any = [];
  updateData: any
  editFlag: boolean = false;
  images: any=[];
  videos: any=[];
  pdf: any=[];
  editId: any;
  emptyFile:boolean= true;
  submitted_1:boolean=false;
  showText:boolean=false
  //Media:any=[];
  constructor(public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private service: ApiServicesService,
    public upload: UploadService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private dataService:DataService,private activeRoute:ActivatedRoute,
    private commonService:CommonService
    ) {
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
      this.industryList();
      this.requirementDetail(this.editId)
    }
    else {
      this.createForm();
      this.industryList();
    }

    
  }

  createForm() {
    this.mor_form = this.fb.group({
      title: ['', Validators.required],
      // select_order_req_option: ['offering manufacturing service', Validators.required],
      description: ['', Validators.required],
      industry_id: ['', Validators.required],
      category1_id: ['', Validators.required],
      rate: ['', Validators.required],
      unit_type: ['', Validators.required],
      delivery_details: ['', Validators.required],
      payment_term: ['', Validators.required],
      req_type: ['manufacturing order requirement', Validators.required],
      custom_fields: new UntypedFormArray([]),
      // media:[[], Validators.required],
    });

  }

  setData() {
    this.showText=true;
    this.emptyFile= true;
    this.submitted_1=true;
    this.mor_form.patchValue({
      title: this.updateData.title,
      industry_id: this.updateData.industry_id,
      category1_id: this.updateData.category1_id,
      description: this.updateData.description,
      unit_type: this.updateData.unit_type,
      rate: this.updateData.rate,
      delivery_details: this.updateData.delivery_details,
      payment_term: this.updateData.payment_term,
    })
    let industry = {
        value: this.updateData.industry_id
      
    }
    this.getCategories(industry);
  }

  setCustomfields() {
    if (this.updateData.CustomFields.length > 0) {
      for (let i = 0; i < this.updateData.CustomFields.length; i++) {
        this.t.push(
          this.fb.group({
            lable: this.updateData.CustomFields[i].lable_name,
            content: this.updateData.CustomFields[i].content
          })
        )
      }
    }
  }

  requirementDetail(id:any) {
    let dataToPost = {
      requirement_id: id
    }
    this.service.get(dataToPost, API_ROUTES.MyRequirements.getRequirementDetail).pipe().subscribe((res => {
      console.log(res);
      
      if (res.success) {
        this.updateData = res.result;
        console.log("requirementDetail=" + res);
        // this.setData();
        this.setCustomfields();
        this.setData();
        // this.files = this.updateData.Media
        for(let i=0;i<this.updateData.Media.length;i++){
          if(this.updateData.Media[i].media_type.toLowerCase().includes('image')){
            this.images.push(this.updateData.Media[i])
          }
          else if (this.updateData.Media[i].media_type.toLowerCase().includes('video')){
            this.videos.push(this.updateData.Media[i])
          }
          else {
            this.pdf.push(this.updateData.Media[i])
          }
        } 
        this.files = [...this.images,...this.videos,...this.pdf];
        this.files.forEach(function(v:any){ delete v.id });
        }
        else {
          // this.toastr.error(res.msg)
        }
        

    }))
  }

  get f() { return this.mor_form.controls; }
  get t() { return this.f.custom_fields as UntypedFormArray; }
  get customfieldGroups() {
    return this.t.controls as UntypedFormGroup[];
  }
  
  industryList() {
    this.service.get({}, API_ROUTES.MyRequirements.industryList).pipe().subscribe((res => {
      console.log(res);
      if (res.success) {
        this.industrylist = res.result;
        console.log("industrylist=" + this.industrylist);
      } else {
        // this.toastr.error(res.msg)
      }

    }))

  }
  getCategories(event:any) {
    let industry = {
      industry_id:event.value
    }
    this.service.get(industry, API_ROUTES.MyRequirements.industryCategory1).pipe().subscribe((res => {
      console.log(res);
      if (res.success) {
        this.category1List = res.result.rows;
        console.log("category1List=" + this.category1List);
      }
      else {
        // this.toastr.error(res.msg);
      }

    }))

  }

  submit(body: any) {
    console.log(this.t.status);
   
    console.log(this.mor_form.value);
    this.mor_form.value.req_type = "manufacturing order requirement";
    console.log(this.mor_form.value);
    if (this.files.length > 0) {
      // for (let i = 0; i < this.files.length; i++) {
      //   let file = {
      //     url: this.files[i].Location,
      //     media_type: this.files[i].type
      //   }
      //   this.media.push(file);
      // }
      console.log(this.media);
      this.mor_form.value.media = this.files;
    }
    if(this.files.length <=0){
      this.emptyFile = true;
    }
    if(this.mor_form.valid && this.files.length <=0){
      this.emptyFile = true;
     }
     this.submitted = true;
     this.submitted_1 = true
    if (this.mor_form.valid && this.files.length > 0) {
      if (this.editFlag) {
        // const dialogRef = this.dialog.open(EditPopupComponent, {
        //   maxHeight: '100vh',
        //   width: '465px',
        //   panelClass: 'yespost',
        //   data: {
        //     img: 'assets/images/Success.png',
        //     heading: 'Are you sure you want to update this Manufacturing Order Requirement?',
        //     report: 'Back',
        //     cancel: 'Yes, Save'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.mor_form.value.requirement_id = this.editId
            this.service.put(this.mor_form.value, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Manufacturing order requirement updated successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/home']);
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
        //     heading: 'Are you sure you want to post this manufacturing order requirement?',
        //     report: 'Back',
        //     cancel: 'Yes, Post'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.service.post(this.mor_form.value, API_ROUTES.MyRequirements.createRequirement, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Manufacturing order requirement added successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/home']);
              });

            });
        //   }

        // })
      }
    }
  }

  goBack(){
    this.commonService.goBack();
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

  addfield() {
    const dialogRef = this.dialog.open(AddFieldComponent, {
      maxHeight: '100vh',
      width: '450px'
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
    return this.mor_form.controls.custom_fields.controls;
  }

  updateForm() {
    this.submitted = true;
   this.submitted_1=true
    console.log(this.mor_form.value);
    this.mor_form.value.req_type = "manufacturing order requirement";
    console.log(this.mor_form.value);
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        let file = {
          url: this.files[i].Location,
          media_type: this.files[i].type
        }
        this.media.push(file);
      }
      console.log(this.media);
      this.mor_form.value.media = this.media;

    }
    this.service.put(this.mor_form.value, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res) => {
      console.log(res);

      if (res.success_code == 201) {
      }
    })
  }

}
