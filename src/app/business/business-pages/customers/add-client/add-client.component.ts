import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  @ViewChild('select') private select: MatSelect;
  itras:any=['name','surname'];
  counternumber:any="";
  clientForm: FormGroup;
  currentUrl: any;
  addPage: boolean=true;
  updatePage: boolean = false;
  editFlag: boolean=false;
  submitted: boolean=false;
  editId: any;
  updateData: any;
  // country_code: any =  [{'id':'+91','value':'+91'}];
  customer:any=[{'id':'buyer','value':'buyer'},{'id':'seller','value':'seller'},{'id':'other','value':'other'}]
  states: any;
  cities: any;
  gstPattern = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$";


  constructor(
    private fb: FormBuilder,
    private service: ApiServicesService ,
    private dialog:MatDialog, 
    private router: Router,
    private activeRoute:ActivatedRoute,
    private commonService: CommonService
    ) 
      { 
        this.activeRoute.queryParams.subscribe((params) =>{
          this.editId = params?.['id'];
        })
     }

  ngOnInit(): void {
    this.getState()
    if(this.editId && this.editId!= null && this.editId!=undefined && this.editId!= " "){
      this.editFlag = true;
    }
    if(this.editFlag && this.editId){
      this.createForm();
      this.clientDetail(this.editId);
    }
    else {
      this.createForm();
    }
  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  createForm() {
    this.clientForm = this.fb.group({
      company_name: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      country_code: ['+91',Validators.required],
      contact_number: ['',Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      associate_industry: ['', Validators.required],
      associate_category: ['', Validators.required],
      gst_number: ['', [Validators.required,Validators.pattern(this.gstPattern)]],
      customer_category: ['', Validators.required]
    });
  }

  clientDetail(id:any) {
    let dataToPost = {
      customerId: id
    }
    this.service.get(dataToPost, API_ROUTES.customers.customerDetails).pipe().subscribe((res => {
      console.log(res);
        this.updateData = res.result;
        this.setData();
    }))
  }
 
  get f() { return this.clientForm.controls; }

  
  setData() {
    this.addPage=false
    this.clientForm.patchValue({
      company_name:this.updateData.company_name,
      email:this.updateData.email,
      country_code:this.updateData.country_code,
      contact_number:this.updateData.contact_number,
      address1:this.updateData.address1,
      address2:this.updateData.address2,
      state:this.updateData.state,
      city:this.updateData.city,
      associate_industry: this.updateData.associate_industry,
      associate_category:this.updateData.associate_category,
      gst_number:this.updateData.gst_number,
      customer_category:this.updateData.customer_category,
    })
      let clientstate={
        "target":{
          "value":this.updateData.state
        }
      }
      this.getCity(clientstate);
  }

  submitClientForm(data:any) {
    console.log(data)
    if (this.clientForm.valid) {
      if (this.editFlag) {
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/addpost.png',
            heading: 'Are you sure you want to save this client?',
            report: 'Back',
            cancel: 'Yes, Save'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.service.put(data, {id:this.editId}, API_ROUTES.customers.updateCustomer).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Client updated successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                if(this.clientForm.value['customer_category'].toLowerCase()  =='buyer'){
                  this.router.navigate(['/business/customers/buyer']);
                }
                else{
                  this.router.navigate(['/business/customers/seller']);
                }              });
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
            img: 'assets/images/addpost.png',
            heading: 'Are you sure you want to post this client?',
            report: 'Back',
            cancel: 'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result == true) {
            this.service.post(data, API_ROUTES.customers.addcustomer, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Client added successfully',
                  // title: 'Please check your inbox and click in the recieved link to reset a password',
                  btn: 'Okay'
                }

              }
              );
              dialogRef.afterClosed().subscribe(result => {
                if(this.clientForm.value['customer_category'].toLowerCase()  =='buyer'){
                  this.router.navigate(['/business/customers/buyer']);
                  
                }
                else{
                  this.router.navigate(['/business/customers/seller']);
                }
              }
              );
            });
          }
        })
      }
    }
    else{ 
      this.submitted = true;
    }
  }

  getState(){
    this.service.get({}, API_ROUTES.customers.getState).pipe().subscribe((res => {
      console.log(res);
      if (res.success) {
        this.states = res.result;
        console.log(this.states);
      } 
    }))
  }
  getCity(event:any){
    let getCities = {
      state : event.target.value
    }
    this.service.get(getCities,`${API_ROUTES.customers.getState}`).pipe().subscribe((res)=>{
      this.cities = res.result;
      console.log(this.cities)
    })
  }

  navigateBack() {
    this.commonService.goBack();
  }
}
