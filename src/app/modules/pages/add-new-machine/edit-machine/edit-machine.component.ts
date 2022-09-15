import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCnameRecord } from 'dns';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { AddNewMachineComponent } from '../add-new-machine/add-new-machine.component';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.scss']
})
export class EditMachineComponent implements OnInit {
  data: any;
  machineForm: FormGroup;
  submitted: boolean;
  editData: any;
  interestName: any;
  listtype: any;
  machine: any;
  machineDetails: any;
  machineId: any;
  constructor(public datepipe:DatePipe,private fb:FormBuilder,private dialog :MatDialog,private service:ApiServicesService,private router :Router, private activeRoute:ActivatedRoute,private localService:LocalStorageProvider) { }

  ngOnInit(): void {

    this.machineForm=this.fb.group({
      name:[''],
      type:[''],
      make:[''],
      capacity:[''],
      quantity:['']
    })
 // this.onGetInterest();
    this.activeRoute.queryParams.subscribe((params) =>{
      this.machineId = params?.['id'];
      // console.log(this.machineId)
      this.getMachineDetails();
     
    })
    
    this.patchData()
  }

  onSubmit(data:any){
    let machineDate=this.datepipe.transform(data.make,'yyyy/MM/dd');
    data.make=machineDate
    console.log(data, '===>')
    this.service.put(data,{id:this.machineId},`${API_ROUTES.Machine.updateMachine}`).pipe().subscribe((res)=>{
      if(res.success_code==201){
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width:'465px',
          panelClass:'yespost',
          data: {
            img:'../.assets/images/Icon.png',
            heading:'Are you sure you want to save this machine?',
            para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
            report:'Back',
            cancel:'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe((confirm: any) => {
          if (confirm !== undefined && confirm !== null && confirm) {
            const dialogRef = this.dialog.open(PostPublishComponent, {
              maxHeight: '100vh',
              width:'465px',
              panelClass:'products',
              data: {
                img:'assets/images/Completed_check.svg',
                heading:'Machine Updated Successfully',
                title:'Please check your inbox and click in the recieved link to reset a password',
                btn:'Okay'
              }
              
            }
            );
            dialogRef.afterClosed().subscribe(result => {
              
              this.router.navigate(['/main/profile/instruments'])
            });
           
          }
        }); 
      }

    })
}
getMachineDetails(){
  this.service.get({id:this.machineId},`${API_ROUTES.Machine.machineDetail}`).pipe().subscribe((res)=>{
    this.interestName = res.result
    console.log(this.interestName);
      this.patchData();

  })
}
patchData() {
  this.machineForm.patchValue({
    name:this.interestName.name,
    type:this.interestName.type,
    make:this.interestName.make,
    capacity:this.interestName.capacity,
    quantity:this.interestName.quantity

  });
}
}
