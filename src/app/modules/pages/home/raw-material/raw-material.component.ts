import { Component, OnInit } from '@angular/core';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ToastrService } from 'ngx-toastr';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { DataService } from 'src/app/services/data.service';
import { bool } from 'aws-sdk/clients/redshiftdata';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.scss']
})
export class RawMaterialComponent implements OnInit {
  rawMaterialForm:any;
  industrylist: any=[];
  category1List: any=[];
  category2List: any=[];
  customfields: any=[];
  updateData:any;
  editFlag:boolean=false;
  submitted:boolean=false
  editId: any;
  producttype: any;

  constructor(public dialog:MatDialog,private fb:UntypedFormBuilder,private service:ApiServicesService,
    private toastr:ToastrService,
    private commonService:CommonService,private dataService:DataService,private activeRoute:ActivatedRoute,private router:Router) { 
      this.activeRoute.queryParams.subscribe((params) =>{
        this.editId = params?.['id'];  
      })
    }

  ngOnInit(): void {
    // this.editFlag = this.dataService.getDataByKey('editFlag');
    // let editId = this.dataService.getDataByKey('editId');
    if(this.editId && this.editId!= null && this.editId!=undefined && this.editId!= " "){
      this.editFlag = true;
    }
    if(this.editFlag && this.editId){
      this.createForm();
      this.industryList();
      this.requirementDetail(this.editId);
    }
    else {
      this.createForm();
      this.industryList();
    }
    
  }

  createForm(){
    this.rawMaterialForm = this.fb.group({
      title:['',[Validators.required]],
    description: ['',[Validators.required]],
    industry_id: ['',[Validators.required]],
    category1_id: ['',[Validators.required]],
    category2_id: ['',[Validators.required]],
    category3_id:['',[Validators.required]],
    capacity: ['',[Validators.required]],
    unit_type: ['',[Validators.required]],
    price: ['',[Validators.required]],
    req_type: ['raw material',[Validators.required]],
    custom_fields: new UntypedFormArray([])
    })
  }

  goBack(){
    this.commonService.goBack();
  }

  get f() { return this.rawMaterialForm.controls; }
    get t() { return this.f.custom_fields as UntypedFormArray; }

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
        
        
        // this.loader.start();
        
      } else {
        // this.toastr.error(res.msg)
      }
      
    }))
  }
    setData(){
      this.rawMaterialForm.patchValue({
        title:this.updateData.title,
    description: this.updateData.description,
    industry_id: this.updateData.industry_id,
    category1_id: this.updateData.category1_id,
    category2_id: this.updateData.category2_id,
    category3_id:this.updateData.category3_id,
    capacity: this.updateData.capacity,
    unit_type: this.updateData.unit_type,
    price: this.updateData.price,
      })
      let industry = {
        
          "value":this.updateData.industry_id
        
      }
      let category1={
       
          "value":this.updateData.category1_id
        
      }
      let category2={
       
          "value":this.updateData.category2_id
        
      }
      this.category2(industry);
      this.category3(category1);
      this.productTypes(category2)
    }  

  postPublish(form:any){
    this.submitted=true
    if (this.rawMaterialForm.valid) {
      if (this.editFlag) {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/Success.png',
            heading: 'Are you sure you want to update this Raw material?',
            report: 'Back',
            cancel: 'Yes, Save'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.rawMaterialForm.value.requirement_id = this.editId
            this.service.put(this.rawMaterialForm.value, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Raw material updated successfully',
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
            heading: 'Are you sure you want to post this Raw material?',
            report: 'Back',
            cancel: 'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.service.post(this.rawMaterialForm.value, API_ROUTES.MyRequirements.createRequirement, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Raw Material added successfully',
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

  updateForm(form:any){
    this.service.put(form,{},API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res:any)=>{
      console.log(res);
})
  }

  industryList(){
    this.service.get({},API_ROUTES.MyRequirements.industryList).pipe().subscribe((res=>{
      console.log(res);
      if (res.success) {
        this.industrylist = res.result;
        console.log(this.industrylist);
        // this.rawMaterialForm.patchValue({
        //   industry_id:this.updateData.industry_id
        // })
        
        // this.loader.start();
        
      } else {
        // this.toastr.error(res.msg)
      }
      
    })) 
    
  }

  category2(event:any){
    let industry = {
      industry_id:event.value
    }
    this.service.get(industry,API_ROUTES.MyRequirements.industryCategory1).pipe().subscribe((res=>{
      console.log(res);
      if(res.success){
        this.category1List = res.result.rows;
      }
      else {
        // this.toastr.error(res.msg);
      }
      
    }))
  }

  category3(event:any){
    let dataToPost = {
      category1_id: event.value
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
  productTypes(event:any){
    this.service.get({category2_id:event.value},`${API_ROUTES.Marketplace.catagory_3}`).pipe().subscribe((res)=>{
      this.producttype = res.result.rows;
      console.log(this.producttype)
    })
  }
  addfield(){
    //   let customfield = {
    //     heading:"A",
    //     name:"B"
    //   }
    //   this.customfields.push(customfield);
    
  
    const dialogRef = this.dialog.open(AddFieldComponent, {
      maxHeight: '100vh',
      width:'450px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.data != null) {
      //if(result == "Success"){
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
      return this.rawMaterialForm.controls.custom_fields.controls;
    }

}
