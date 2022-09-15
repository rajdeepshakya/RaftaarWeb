import { Component, OnInit } from '@angular/core';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ToastrService } from 'ngx-toastr';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
  otherForm:any;
  industrylist: any=[];
  category1List: any=[];
  category2List: any=[];
  category3List: any=[];
  units_type = ["tonne","Kg","pieces"];
  submitted: boolean = false;
  imageUrl: any;
  files: any = [];
  imageName: any;
  media: any = [];
  customfields: any = [];
  updateData: any
  editFlag: boolean = false;
  images: any=[];
  videos: any=[];
  pdf: any=[];
  editId: any;
  showProductType:boolean=false;
  showText:boolean=false;
  //Media:any=[];
  constructor(public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private service: ApiServicesService,
    public upload: UploadService,
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
    // if(this.editId && this.editId!= null && this.editId!= " " && this.editId != undefined){
    //   this.editFlag = true;
    // }
    this.editFlag = this.dataService.getDataByKey('editFlag');
    this.editId = this.dataService.getDataByKey('editId');

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

  goBack(){
    this.commonService.goBack();
  }

  createForm() {
    this.otherForm = this.fb.group({
      // title:[''],
      description: ['',[Validators.required]],
      industry_id: ['',[Validators.required]],
      category1_id: ['',[Validators.required]],
      category2_id: ['',[Validators.required]],
      category3_id: ['',[Validators.required]],
      no_of_unit: ['',[Validators.required]],
      unit_type: ['',[Validators.required]],
      lead_time: ['',[Validators.required]],
      payment_term: ['',[Validators.required]],
      req_type:['other'],
      custom_fields: new UntypedFormArray([]),
      product_type:['',[Validators.required]]
    });

  }

  setData() {
    this.showText=true
    this.otherForm.patchValue({
    description: this.updateData.description,
    industry_id: this.updateData.industry_id,
    category1_id: this.updateData.category1_id,
    category2_id: this.updateData.category2_id,
    category3_id: this.updateData.category3_id,
    no_of_unit: this.updateData.no_of_unit,
    unit_type: this.updateData.unit_type,
    lead_time: this.updateData.lead_time,
    payment_term: this.updateData.payment_term,
    product_type: this.updateData.product_type
    })
    let industry = {
      
        "value":this.updateData.industry_id
      
    }
    let category1id={
    
        "value":this.updateData.category1_id
      
    }
    let category2id={
    
        "value":this.updateData.category2_id
      
    }
    
    this.getCategories(industry);
    this.category3(category1id);
    if(this.updateData.category3_id){
      this.category4(category2id);
    }
    else {
      this.category3List = [{id:1,title:'Other'}];
      this.otherForm.patchValue({
        category3_id:this.category3List[0].id
      })
      this.showProductType = true;
    }
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

  get f() { return this.otherForm.controls; }
  get t() { return this.f.custom_fields as UntypedFormArray; }
  get customfieldGroups() {
    return this.t.controls as UntypedFormGroup[];
  }
  

  industryList(){
    this.service.get({},API_ROUTES.MyRequirements.industryList).pipe().subscribe((res=>{
      console.log(res);
      if (res.success) {
        this.industrylist = res.result;
        console.log(this.industrylist);
        
        // this.loader.start();
        
      } else {
        // this.toastr.error(res.msg)
      }
      
    }))
  }

  category3(ev:any){
    let dataToPost = {
      category1_id: ev.value
    }
    this.service.get(dataToPost,API_ROUTES.MyRequirements.industryCategory2).pipe().subscribe((res=>{
      console.log(res);
      if(res.success){
        this.category2List = res.result.rows;
      }
      else {
        // this.toastr.error(res.msg);
      }
      
    }))
  }

  category4(event:any){
    this.service.get({category2_id:event.value},`${API_ROUTES.Marketplace.catagory_3}`).pipe().subscribe((res)=>{
      this.category3List = res.result.rows;
      if(this.category3List.length <= 0){
        this.category3List = [{id:1,title:'Other'}];
      }
      console.log(this.category3List)
    })
  }

  selectProductType(event:any){
    if(event.value == 1){
      this.showProductType = true;
    }
  }

  // category4(ev:any){
  //   let dataToPost = {
  //     category2_id: ev.target.value
  //   }
  //   this.service.get(dataToPost,API_ROUTES.MyRequirements.industryCategory3).pipe().subscribe((res=>{
  //     console.log(res);
  //     if(res.success){
  //       this.category3List = res.result.rows;
  //     }
  //     else {
  //       this.toastr.error(res.msg);
  //     }
      
  //   }))
  // }

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

  postPublish(body: any) {
    this.submitted = true;
    console.log(this.otherForm.value);
    this.otherForm.value.req_type = "other";
    console.log(this.otherForm.value);
    if (this.files.length > 0) {
      // for (let i = 0; i < this.files.length; i++) {
      //   let file = {
      //     url: this.files[i].Location,
      //     media_type: this.files[i].type
      //   }
      //   this.media.push(file);
      // }
      console.log(this.media);
      this.otherForm.value.media = this.files;
    }
    if(this.showProductType){
      this.otherForm.removeControl('category3_id');
    } else {
      this.otherForm.removeControl('product_type');
    }
    if (this.otherForm.valid) {
      if (this.editFlag) {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/addpost.png',
            heading: 'Are you sure you want to update this Other?',
            report: 'Back',
            cancel: 'Yes, Save'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.otherForm.value.requirement_id = this.editId
            delete this.otherForm.value['term_condition']
            this.service.put(this.otherForm.value, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Others updated successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/home']);
              });


            }))
          }

        })




      }
      else {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/Success.png',
            heading: 'Are you sure you want to post this Other?',
            report: 'Back',
            cancel: 'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.service.post(this.otherForm.value, API_ROUTES.MyRequirements.createRequirement, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Others added successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/home']);
              });

            });
          }

        })
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
    return this.otherForm.controls.custom_fields.controls;
  }

  updateForm() {
    this.submitted = true;
    console.log(this.otherForm.value);
    this.otherForm.value.req_type = "manufacturing order requirement";
    console.log(this.otherForm.value);
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        let file = {
          url: this.files[i].Location,
          media_type: this.files[i].type
        }
        this.media.push(file);
      }
      console.log(this.media);
      this.otherForm.value.media = this.media;

    }
    this.service.put(this.otherForm.value, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res) => {
      console.log(res);

      if (res.success_code == 201) {
      }
    })
  }

}
