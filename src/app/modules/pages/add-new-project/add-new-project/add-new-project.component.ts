import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { DatePipe } from "@angular/common";
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { Subject } from 'rxjs';
import { AnyMxRecord, AnyNaptrRecord } from 'dns';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.scss'],

})
export class AddNewProjectComponent implements OnInit {
  projectForm:any;
  machine:any=['Select Machine','Machine 1']
  instrument:any=['Select Instrument','Instrument 1']
  submitted:boolean=false;
  imageUrl: any;
  imageName: any
  selectDummyUserId: any;
  data: any;
countnumber:any="";
media:any=[];
Highlights:any[];
instrudata: any;
editFlag:boolean=false;
images: any=[];
videos: any=[];
pdf: any=[];
  editId: any;
  files:any=[]
  interestName: any;
  addPage:boolean=true;
  emptyFile:boolean= true;
  submitted_1:boolean=false;

  disabled: boolean;
  
  

constructor(public datepipe:DatePipe, private fb:FormBuilder, private dialog:MatDialog,private service:ApiServicesService,private router :Router,
  public upload: UploadService,private loader:NgxUiLoaderService,private toastr:ToastrService,private commonService:CommonService,
  private activeRoute:ActivatedRoute
  ) {
    
      this.activeRoute.queryParams.subscribe((params) =>{
        this.editId = params?.['id'];
      })
      this.minDateToFinish.subscribe((r: string | number | Date) => {
        this.minDate = new Date(r);
      })
      this.endminDateToFinish.subscribe((r: string | number | Date) => {
        this.minstartDate = new Date(r);
      })
   }

   minDateToFinish = new Subject<string>();
   endminDateToFinish = new Subject<string>();
   showmsg:boolean=false
   minDate:any;
   minstartDate:any;
   testitem:any;
   toggleBool: boolean=true;
  dateChange(e:any) {
    this.minDateToFinish.next(e.value.toString());
   
  }
  isDisabled = true;
  triggerSomeEvent() {
    this.isDisabled = !this.isDisabled;
      return;
  }
enddateChange(e:any){
  this.endminDateToFinish.next(e.value.toString());
  
}
endDateopen(){
console.log('ksdkl')
}


ngOnInit(): void {
  this.getIndustry()

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

goBack(){
  this.commonService.goBack();
}
get f() { return this.projectForm.controls; }

getMachineDetails(id:any){
  let dataToPost = {
    projectId: id
  }
  this.service.get(dataToPost,`${API_ROUTES.Projects.projectsDetail}`).pipe().subscribe((res)=>{
    console.log(this.interestName);
      if (res.success) {
        this.interestName = res.result
        this.setData();
        for(let i=0;i<this.interestName.Media.length;i++){
          let media = {
            'media_type':this.interestName.Media[i].media_type,
            'url': this.interestName.Media[i].url
             }
          if(this.interestName.Media[i].media_type.toLowerCase().includes('image')){
            this.images.push(media)
          }
          else if (this.interestName.Media[i].media_type.toLowerCase().includes('video')){
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

 /**createForm*/
 createForm() {
  this.submitted = false;

  this.projectForm = this.fb.group({
    title:['',[Validators.required]],
    description:['',[Validators.required]],
    customer_name:['',[Validators.required]],
    enter_quantity:['',[Validators.required]],
    project_start_date:['',Validators.required],
    project_end_date:['',Validators.required] ,
    is_live:[false,[Validators.required]] ,
    machine_id:['',[Validators.required]],
    instrument_id:['',[Validators.required]],
    is_starred:[false,[Validators.required]],
    // highlights: new FormArray([new FormControl('',Validators.required)]),
    highlights: this.fb.array([this.createHighLightForm()],Validators.required),
    // media:['',[Validators.required]]
   })

}

createHighLightForm(){
  return this.fb.group({
    highlight_desc: ['', [Validators.required]]
  })
}

get t(): FormArray {
  return this.projectForm.get('highlights') as FormArray;
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
  this.addPage=false
  this.emptyFile= true;
  this.submitted_1 = true;
  this.projectForm.patchValue({
    title: this.interestName.title,
    description:this.interestName.description,
    customer_name:this.interestName.customer_name,
    enter_quantity:this.interestName.enter_quantity,
    project_start_date:this.interestName.project_start_date,
    project_end_date: this.interestName.project_end_date,
    is_live: this.interestName.is_live,
    // highlights: this.interestName.Highlights[0].highlight_desc,
    machine_id:this.interestName.machine_id,
    instrument_id:this.interestName.instrument_id,
    is_starred:this.interestName.is_starred,
  })
  console.log(this.t);

  // this.t.controls[0].value.highlight_desc = this.interestName.Highlights[0].highlight_desc
  this.t.controls[0].get('highlight_desc')?.patchValue(this.interestName.Highlights[0].highlight_desc);
  for(let i=1; i<this.interestName.Highlights.length;i++){
    if(this.interestName.Highlights.length > 1){
      let item = this.fb.group({
        highlight_desc: [this.interestName.Highlights[i].highlight_desc, [Validators.required]]
      })
      this.t.push(item);
    }
  }
}
  onSubmit(post:any){
    var requestBody= {
      media:  this.media,
      highlights:post.highlights,
      title:  post.title,
      description: post.description,
      customer_name:post.customer_name,
      enter_quantity:post.enter_quantity,
      instruments:post.instrument,
      project_start_date:post.project_start_date,
      project_end_date:post.project_end_date ,
      is_live:post.is_live ,
      machine_id:post.machine_id,
      instrument_id:post.instrument_id,
      is_starred:post.is_starred,
      
  }
 
  if (this.files.length > 0) {
    console.log(this.files);
    requestBody.media = this.files;
  }
  if(this.files.length <=0){
    this.emptyFile = true;
  }
  if(this.projectForm.valid && this.files.length <=0){
    this.emptyFile = true;
   }
    this.submitted = true;
    this.submitted_1=true
    console.log(post,"addProjects");

    let projectDate=this.datepipe.transform(requestBody.project_start_date,'yyyy/MM/dd');
    requestBody.project_start_date=projectDate
    let projectendDate=this.datepipe.transform(requestBody.project_end_date,'yyyy/MM/dd');
    requestBody.project_end_date=projectendDate
    if(post.is_live == true){
      delete requestBody['project_end_date'];
      this.projectForm.removeControl('project_end_date');
    }
    if(requestBody['machine_id'] == ""){
      delete requestBody['machine_id']
    }
    if(requestBody['instrument_id'] == ""){
      delete requestBody['instrument_id']
    }
    if (this.projectForm.valid) {
      if (this.editFlag) {
        // const dialogRef = this.dialog.open(EditPopupComponent, {
        //   maxHeight: '100vh',
        //   width: '465px',
        //   panelClass: 'yespost',
        //   data: {
        //     img: 'assets/images/addpost.png',
        //     heading: 'Are you sure you want to save this Projects?',
        //     report: 'Back',
        //     cancel: 'Yes, Save'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.service.put(requestBody,{project_id:this.editId}, API_ROUTES.Projects.updateProjects).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Projects updated successfully',
                  btn: 'Okay'
                }
              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/profile/projects'])
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
        //     heading: 'Are you sure you want to post this Projects?',
        //     report: 'Back',
        //     cancel: 'Yes, Post'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.service.post(requestBody, API_ROUTES.Projects.createProjects, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Projects added successfully',
                  btn: 'Okay'
                }
              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/profile/projects'])
              });

            });
        //   }

        // })
      }
    
  

  

  }
}
  
  getIndustry(){
    const params = {
      type : 'machine'
    }
    this.service.get(params,`${API_ROUTES.Machine.machineList}`).pipe().subscribe((res)=>{
      this.data = res.result;
      console.log(this.data)
    })
    const instrudata = {
      type : 'instrument'
    }
    this.service.get(instrudata,`${API_ROUTES.Machine.instrumentList}`).pipe().subscribe((res)=>{
      this.instrudata = res.result;
      console.log(this.instrudata)
    })
  }
  
  fix(id: any) {
    console.log(id.target.value);
    this.projectForm.value.machine_id =id;
    this.projectForm.value.industry_id=id;
    
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
  this.projectForm.reset();
}



}
