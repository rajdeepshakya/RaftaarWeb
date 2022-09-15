import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { AddNewComponent } from 'src/app/shared/dialogs/add-new/add-new.component';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';

@Component({
  selector: 'app-profile-instruments',
  templateUrl: './profile-instruments.component.html',
  styleUrls: ['./profile-instruments.component.scss']
})
export class ProfileInstrumentsComponent implements OnInit {
  cards=[
    {
    heading:'Instrument / Machine Name',
    min:'Content here',
    },
    {
      heading:'Instrument / Machine Name',
      min:'Content here',
      },
  ]
  isShow=false
  data: any;
  machineId: any;
  myProfile:boolean = true;

  constructor(public datepipe:DatePipe,private dialog :MatDialog,
    private commonService:CommonService,private activeRoute:ActivatedRoute,private service:ApiServicesService,private router :Router,private storageService: LocalStorageProvider) { }
  showdropdown(){
    this.isShow=!this.isShow
  }
  openAddNew(){
    const dialogRef = this.dialog.open(AddNewComponent, {
      maxHeight: '100vh',
      width:'501px',
      panelClass:'addNew',
      data: {

      }
    });
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.machineId = params?.['id'];
      // console.log(this.machineId)
      this.getIndustry()
     
    })
    // let mediumDate = new Date();
    // console.log(this.datepipe.transform(mediumDate,"yyyy-MM-dd"))
  }
 
  getIndustry(){
    // let dataPost={
    //   type:'machine'
   
    // }
    
    // this.service.get(dataPost,`${API_ROUTES.Machine.machineList}`).pipe().subscribe((res)=>{
    //   this.data = res.result;
    //   console.log(this.data)
    // })
    // let datainstrument={
    //   type:'instrument'
    // }

    let params;
  if(this.storageService.getItem("currentUser") == "other"){
    this.myProfile = false;
    params = {
      id:this.storageService.getItem("currentUserId")
    }
  }
  else {
    this.myProfile = true;
    params = {}
  }
    this.service.get(params,`${API_ROUTES.Machine.instrumentList}`).pipe().subscribe((res)=>{
      this.data = res.result;
      console.log(this.data)
    })
}
edit(id:any){
  this.router.navigate(['/main/profile/newMachine'],{queryParams:{id:id}})
}
// machineDelete(id:any){
//   this.service.delete({id:id},`${API_ROUTES.Machine.deleteMachine}`).pipe().subscribe((res)=>{
//     if(res.success_code==201){
//       let dataPost={
//         type:'machine'
//       }
//       this.service.get(dataPost,`${API_ROUTES.Machine.machineList}`).pipe().subscribe((res)=>{
//         this.data = res.result;
//         console.log(this.data)
//       })
//       let datainstrument={
//         type:'instrument'
//       }
//       this.service.get(datainstrument,`${API_ROUTES.Machine.instrumentList}`).pipe().subscribe((res)=>{
//         this.data = res.result;
//         console.log(this.data)
//       })
//       }
//   })
// }

machineDelete(id:any){
  const dialogRef=this.dialog.open(DeleteComponent,{
    maxHeight: '100vh',
    width:'400px',
    data: {
      img:'assets/images/Delete.png',
      heading:'Hey, do you really want to delete this machine / instrument?',
      // para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
      report:'Yes, delete',
      cancel:'Go back'
    }
  })
  dialogRef.afterClosed().subscribe(result => {
    this.service.delete({id:id},`${API_ROUTES.Machine.deleteMachine}`).pipe().subscribe((res)=>{
      if(res.success_code==201){
        let dataPost={
          type:'machine'
        }
        this.service.get(dataPost,`${API_ROUTES.Machine.machineList}`).pipe().subscribe((res)=>{
          this.data = res.result;
          console.log(this.data)
        })
        let datainstrument={
          type:'instrument'
        }
        this.service.get(datainstrument,`${API_ROUTES.Machine.instrumentList}`).pipe().subscribe((res)=>{
          this.data = res.result;
          console.log(this.data);
          this.getIndustry();
        })
        }
    })
  });
}

goBack(){
  this.commonService.goBack();
}
}
