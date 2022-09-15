import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { resourceLimits } from 'worker_threads';
import { DatePipe } from '@angular/common';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { CommonService } from 'src/app/services/common.service';


// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
@Component({
  selector: 'app-add-new-machine',
  templateUrl: './add-new-machine.component.html',
  styleUrls: ['./add-new-machine.component.scss']
})

export class AddNewMachineComponent implements OnInit {
  machineForm:any
  submitted: boolean=false;
  editFlag:boolean=false;
  editId: any;
  interestName: any;
  addPage:boolean=true;
  mahines = ['machine','instruments'];


  constructor(public datepipe:DatePipe,private dialog:MatDialog,
     private fb:FormBuilder,
     private service:ApiServicesService,
     private router :Router,
     private localService:LocalStorageProvider,
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

  goBack(){
    this.commonService.goBack();
  }
  createForm(){
    this.machineForm=this.fb.group({
      name:['',[Validators.required]],
      type:['',[Validators.required]],
      make:['',[Validators.required]],
      capacity:['',[Validators.required]],
      quantity:['',[Validators.required]]

    })
  }
  get f() { return this.machineForm.controls; }

  getMachineDetails(id:any){
    let dataToPost={
      id:id
    }
    this.service.get(dataToPost,`${API_ROUTES.Machine.machineDetail}`).pipe().subscribe((res)=>{
      this.interestName = res.result
      console.log(this.interestName);
        this.setData();
  
    })
  }
  setData() {
    this.addPage=false
    this.machineForm.patchValue({
      name:this.interestName.name,
      type:this.interestName.type,
      make:this.interestName.make,
      capacity:this.interestName.capacity,
      quantity:this.interestName.quantity
  
    });
  }

  onSubmit(data:any){
    let machineDate=this.datepipe.transform(data.make,'yyyy/MM/dd');
    data.make=machineDate
    console.log(data,"addMachine");
    this.submitted = true;
    let make=this.datepipe.transform(data.make,'yyyy/MM/dd');
    data.make=make
    if (this.machineForm.valid) {
      if (this.editFlag) {
        // const dialogRef = this.dialog.open(EditPopupComponent, {
        //   maxHeight: '100vh',
        //   width: '465px',
        //   panelClass: 'yespost',
        //   data: {
        //     img: 'assets/images/Success.png',
        //     heading: 'Are you sure you want to save this Machine/instruments?',
        //     report: 'Back',
        //     cancel: 'Yes, Save'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.service.put(data,{id:this.editId}, API_ROUTES.Machine.updateMachine).pipe().subscribe((res => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Machine/Instruments updated successfully',
                  btn: 'Okay'
                }
              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/profile/instruments'])
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
        //     heading: 'Are you sure you want to post this Machine/instrument?',
        //     report: 'Back',
        //     cancel: 'Yes, Post'
        //   }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed', result);
        //   if (result == true) {
            this.service.post(data, API_ROUTES.Machine.createMachine, {}).pipe().subscribe((res) => {
              console.log(res);
              const dialogRef = this.dialog.open(PostPublishComponent, {
                maxHeight: '100vh',
                width: '465px',
                panelClass: 'products',
                data: {
                  img: 'assets/images/Success.png',
                  heading: 'Machine/instruments added successfully',
                  btn: 'Okay'
                }
              }
              );
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/main/profile/instruments'])
              });

            });
        //   }

        // })
      }
    }
}
}
