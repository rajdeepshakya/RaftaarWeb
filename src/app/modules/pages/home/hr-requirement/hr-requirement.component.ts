import { Component, OnInit } from '@angular/core';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/services/upload.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-hr-requirement',
  templateUrl: './hr-requirement.component.html',
  styleUrls: ['./hr-requirement.component.scss'],
  providers:[ ]
})
export class HrRequirementComponent implements OnInit {
  startDate = new Date();
  hrRequirementForm:any;
  customfields: any=[];
  files: any;
  submitted=false
updateData:any;
editFlag: boolean = false;
  editId: any;
  media: any;
  showText=false


  constructor(private dataService:DataService,
    public datepipe:DatePipe,
    public dialog:MatDialog,
    private fb:UntypedFormBuilder,
    private service:ApiServicesService,
    private toastr:ToastrService,
    public upload:UploadService,    
    private router: Router,
    private activeRoute:ActivatedRoute,
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
//  this.editFlag = this.dataService.getDataByKey('editFlag');
//     this.editId = this.dataService.getDataByKey('editId');

    if(this.editFlag && this.editId){
      this.createForm();
      this.requirementDetail(this.editId)
    }
    else {
      this.createForm();
    }
  }

  goBack(){
    this.commonService.goBack();
  }

  get f() { return this.hrRequirementForm.controls; }
    get t() { return this.f.custom_fields as UntypedFormArray; }

    createForm(){
      this.hrRequirementForm = this.fb.group({
      title:['',Validators.required],
      description: ['',[Validators.required]],
      experience_needed: ['',[Validators.required]],
      salary: ['',Validators.required],
      joining_date:['',Validators.required],
      notice:['',Validators.required],
      req_type:['hr'],
      custom_fields : new UntypedFormArray([]),
      upload_resume:['']
      })
  
    }

    setData(){
      this.showText=true
      this.hrRequirementForm.patchValue({
        title: this.updateData.title,
      description: this.updateData.description,
      experience_needed: this.updateData.experience_needed,
      salary: this.updateData.salary,
      joining_date:this.updateData.joining_date,
      notice:this.updateData.notice,
      })
      // this.files = [{ 'Key': "sdsadadsad", "value": "dsfsdf" }]

    }

    setCustomfields(){
      if(this.updateData.CustomFields.length > 0){
      for(let i=0; i<this.updateData.CustomFields.length;i++){
        this.t.push(
          this.fb.group({
            lable: this.updateData.CustomFields[i].lable,
            content: this.updateData.CustomFields[i].content
          })
        )
      }
    }
  }
  // setDatepicker(){

  // }

  requirementDetail(id:any){
    let dataToPost={
      requirement_id:id
    }
    this.service.get(dataToPost,API_ROUTES.MyRequirements.getRequirementDetail).pipe().subscribe((res=>{
      console.log(res);
      if (res.success) {
        this.updateData = res.result;
        this.setData();
      this.setCustomfields();
      this.files = this.updateData.upload_resume;
      this.files.forEach(function(v:any){ delete v.id });
      } else {
        // this.toastr.error(res.msg)
      }
    }))
  }

  deleteImg(){

      this.files = undefined
    console.log(this.files);
    
    
  }





  postPublish(body: any) {
    this.submitted = true;
    this.hrRequirementForm.value.req_type = "hr";
    console.log(this.hrRequirementForm.value);
    let projectDate=this.datepipe.transform(body.joining_date,'yyyy/MM/dd');
    body.joining_date=projectDate
    this.hrRequirementForm.value.upload_resume = this.files
    if (this.hrRequirementForm.valid) {
      if (this.editFlag) {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/Success.png',
            heading: 'Are you sure you want to save this HR requirement?',
            report: 'Back',
            cancel: 'Yes, Save'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.hrRequirementForm.value.requirement_id = this.editId
            this.service.put(this.hrRequirementForm.value, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'HR requirement updated successfully',
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
            heading: 'Are you sure you want to post this HR requirement?',
            report: 'Back',
            cancel: 'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.service.post(this.hrRequirementForm.value, API_ROUTES.MyRequirements.createRequirement, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'HR requirement added successfully',
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
  //   if(this.hrRequirementForm.valid){
  //     const dialogRef = this.dialog.open(EditPopupComponent, {
  //       maxHeight: '100vh',
  //       width:'465px',
  //       panelClass:'yespost',
  //       data: {
  //         img:'assets/images/Save.png',
  //         heading:'Are you sure you want to post this HR requirement?',
  //         report:'Back',
  //         cancel:'Yes, Post'
  //       }
  //     });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //     if (result == true) {
  //       if(this.editFlag){
  //         this.hrRequirementForm.value.requirement_id = this.editId
  //         this.service.put(this.hrRequirementForm.value,{},API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res=>{
  //           console.log(res);
  //           const dialogRef = this.dialog.open(PostPublishComponent, {
  //             maxHeight: '100vh',
  //             width:'465px',
  //             panelClass:'products',
  //             data: {
  //               img:'assets/images/Success.png',
  //               heading:'HR requirement added Successfully',
  //               btn:'Okay'
  //             }
              
  //           }
  //           );
  //           dialogRef.afterClosed().subscribe(result => {
  //             this.router.navigate(['/main/home/manufacturing-o-r-list']);
  //           });
            
  //         }))
  //       }
  //       else {
  //         this.service.post(this.hrRequirementForm.value, API_ROUTES.MyRequirements.createRequirement, {}).pipe().subscribe((res) => {
  //           console.log(res);
  //           const dialogRef = this.dialog.open(PostPublishComponent, {
  //             maxHeight: '100vh',
  //             width:'465px',
  //             panelClass:'products',
  //             data: {
  //               img:'assets/images/Success.png',
  //               heading:'HR requirement Added Successfully',
  //               btn:'Okay'
  //             }
              
  //           }
  //           );
  //           dialogRef.afterClosed().subscribe(result => {
  //             this.router.navigate(['/main/home/manufacturing-o-r-list']);
  //           });
  //         });
  //       }
        


  //     }

  //   });
  // }
  }



  addfield(){
    const dialogRef = this.dialog.open(AddFieldComponent, {
      maxHeight: '100vh',
      width:'550px'
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
      return this.hrRequirementForm.controls.custom_fields.controls;
    }

    fileupload(e: any) {
      if(this.files && this.files!= null && this.files !=undefined){
        this.toastr.error("More than 1 file is not allowed")
      }
      else{
        const selectedFile = e.target.files[0];
        this.uploadFile(selectedFile);
      }
      return false;
  
    }
  
    async uploadFile(selectedFile : any){
      let uploadedImage:any = await this.upload.uploadFile(selectedFile);
        if (uploadedImage) {
          console.log(uploadedImage);
          
          this.files=uploadedImage.Location
          
          
          return true;
        } else {
          return false;
        }
    } 
    
    
//   updateForm(form:any){
//     this.service.put(form,{},API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res:any)=>{
//       console.log(res);
// });
//   }  
  
  

}
