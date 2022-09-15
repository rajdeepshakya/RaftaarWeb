import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { AddFieldComponent } from 'src/app/shared/dialogs/add-field/add-field.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { MachineSellComponent } from 'src/app/shared/dialogs/machine-sell/machine-sell.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';


@Component({
  selector: 'app-machine-requirement',
  templateUrl: './machine-requirement.component.html',
  styleUrls: ['./machine-requirement.component.scss']
})
export class MachineRequirementComponent implements OnInit {
  machineForm: any;
  machineoption: any = ['Buy', 'Sell'];
  industrylist: any = [];
  category1List: any = [];
  customfields: any = [];
  submitted=false
  updateData: any
  editFlag: boolean=false;
  editId: any;
  subCatagory: any;
  productBrand: any;
  substype: any;
  producttype: any;
  business: any;
  industry: any;
  showProductType:boolean = false;
  showProductSubType:boolean = false;

  constructor(public dialog: MatDialog, private fb: UntypedFormBuilder, private service: ApiServicesService,
    private toastr: ToastrService,private activeRoute:ActivatedRoute,private router:Router,
    private commonService:CommonService) {
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
      this.businessActivity()
      this.requirementDetail(this.editId);
    }
    else {
      this.createForm();
      this.businessActivity()
    }
  
  }

  goBack(){
    this.commonService.goBack();
  }

  openModal(event:any){
    if(event.value==='Sell'){
      this.sell()
    } 
    else{

    }
  }

  createForm() {
    this.machineForm = this.fb.group({
      description: ['',[Validators.required]],
      select_machine_option: ['',[Validators.required]],
      industry_id: ['',[Validators.required]],
      category1_id: ['',[Validators.required]],
      category2_id:['',[Validators.required]],
      category3_id:['',[Validators.required]],
      category4_id:['',[Validators.required]],
      brand_id:['',[Validators.required]],
      capacity: ['',[Validators.required]],
      unit_type: ['',[Validators.required]],
      price: ['',[Validators.required]],
      req_type: ['machine',[Validators.required]],
      urgency: ['',[Validators.required]],
      custom_fields: new UntypedFormArray([]),
      product_type:['',Validators.required],
      product_sub_type:['',Validators.required]
    })
  }

  get f() { return this.machineForm.controls; }
  get t() { return this.f.custom_fields as UntypedFormArray; }


  requirementDetail(id:any) {
    let dataToPost = {
      requirement_id: id
    }
    this.service.get(dataToPost, API_ROUTES.MyRequirements.getRequirementDetail).pipe().subscribe((res => {
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
  setData() {
    this.machineForm.patchValue({
      title: this.updateData.title,
      description: this.updateData.description,
      select_machine_option: this.updateData.select_machine_option,
      industry_id: this.updateData.industry_id,
      category1_id:this.updateData.category1_id,
      category2_id:this.updateData. category2_id,
      category3_id:this.updateData.category3_id,
      category4_id:this.updateData.category4_id,
      brand_id:this.updateData.brand_id,
      capacity: this.updateData.capacity,
      unit_type: this.updateData.capacity,
      price: this.updateData.price,
      urgency: this.updateData.urgency,
      product_type:this.updateData.product_type,
      product_sub_type:this.updateData.product_sub_type
    })
    let industry={
        "value":this.updateData.industry_id
      
    }
    let category1={
        "value":this.updateData.category1_id
      
    }
    let category2id={
        "value":this.updateData.category2_id
      
    }
    let category3id={
        "value":this.updateData.category3_id
      
    }
    this.getIndustry(industry)
    this.getSubCatagory(category1);

    this.productTypes(category2id);
    this.productsubType(category3id);
    this.brand(category1)

    let event1={
      value:this.updateData.category2_id
    }
    if(this.updateData.category3_id){
      this.productTypes(event1);
    }
    else {
      this.producttype = [{id:1,title:'Other'}];
      this.machineForm.patchValue({
        category3_id:this.producttype[0].id
      })
      this.showProductType = true;
    }
    let event2 = {
      value:this.machineForm.category3_id
    }
    if(this.updateData.category4_id){
      this.productsubType(event2)
    } else {
      this.substype = [{id:1,title:'Other'}];
      this.machineForm.patchValue({
        category4_id: this.substype[0].id
      })
      this.showProductSubType = true;
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


  postPublish(form: any) {
  
    //if(form.valid){
      this.submitted=true
    console.log(form);
    if(this.showProductType){
      this.machineForm.removeControl('category3_id');
    } else {
      this.machineForm.removeControl('product_type');
    }
    if(this.showProductSubType){
      this.machineForm.removeControl('category4_id');
    } else {
      this.machineForm.removeControl('product_sub_type');
    }
    if (this.machineForm.valid) {
      if (this.editFlag) {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/Success.png',
            heading: 'Are you sure you want to update this Machine?',
            report: 'Back',
            cancel: 'Yes, Save'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.machineForm.value.requirement_id = this.editId
            this.service.put(this.machineForm.value, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Machine updated successfully',
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
            heading: 'Are you sure you want to post this Machine?',
            report: 'Back',
            cancel: 'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.service.post(this.machineForm.value, API_ROUTES.MyRequirements.createRequirement, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Machine added successfully',
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

  addfield() {
    //   let customfield = {
    //     heading:"A",
    //     name:"B"
    //   }
    //   this.customfields.push(customfield);


    const dialogRef = this.dialog.open(AddFieldComponent, {
      maxHeight: '100vh',
      width: '550px'
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
    return this.machineForm.controls.custom_fields.controls;
  }

  // industryList() {
  //   this.service.get({}, API_ROUTES.MyRequirements.industryList).pipe().subscribe((res => {
  //     console.log(res);
  //     if (res.success) {
  //       this.industrylist = res.result;
  //       console.log(this.industrylist);

  //       // this.loader.start();

  //     } else {
  //       this.toastr.error(res.msg)
  //     }

  //   }))
  //   this.service.get({}, API_ROUTES.MyRequirements.industryCategory1).pipe().subscribe((res => {
  //     console.log(res);
  //     if (res.success) {
  //       this.category1List = res.result.rows;
  //     }
  //     else {
  //       this.toastr.error(res.msg);
  //     }

  //   }))
  // }

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

  updateForm(form: any) {
    this.service.put(form, {}, API_ROUTES.MyRequirements.updateRequirement).pipe().subscribe((res) => {
      // this.data1 = res.result.expToken;
      // console.log(this.data1)
      console.log(res);
      const dialogRef = this.dialog.open(PostPublishComponent, {
        maxHeight: '100vh',
        width: '550px',
        data: {
          img: 'assets/images/require.svg',
          // heading:'Post Published',
          title: 'Are you sure you want to post this machine requirement?',
          btn: 'Yes,Post',
          btnClose: 'Back',
          Close: true
        }
      });
    })
  }

sell(){
  const dialogRef = this.dialog.open(MachineSellComponent, {
    maxHeight: '100vh',
    width: '465px',
    panelClass: 'yespost',
    data: {
      // img: 'assets/images/Success.png',
      heading: 'Machine Sell',
      para:'please add this machine to marketplace if you want to sell',
      report: 'Cancel',
      cancel: 'OK'
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', result);
    if(result){
      this.router.navigate(['/main/marketplace/add-new-product'])

    }
    else{
      this.machineForm.patchValue({
        select_machine_option:'Buy'
      })
    }
})
}

}
