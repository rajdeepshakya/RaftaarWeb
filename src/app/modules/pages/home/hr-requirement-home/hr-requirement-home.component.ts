import { Component, OnInit } from '@angular/core';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ToastrService } from 'ngx-toastr';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareComponent } from '../share/share.component';
import { SharebyComponent } from '../shareby/shareby.component';
import { ReportComponent } from 'src/app/shared/dialogs/report/report.component';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { I } from '@angular/cdk/keycodes';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-hr-requirement-home',
  templateUrl: './hr-requirement-home.component.html',
  styleUrls: ['./hr-requirement-home.component.scss']
})
export class HrRequirementHomeComponent implements OnInit {
  updateData: any;
  post_id: any;
  pdf: any=[];
  media:any
  profileDetails: any;
  editlist:boolean=false


  constructor(public dialog:MatDialog,private service:ApiServicesService,public toastr:ToastrService,
    private activeRoute:ActivatedRoute,private router:Router,private commonService:CommonService) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.post_id = params?.['id'];  
      this.requirementDetail(this.post_id);
    })
  }
  // delete(){
  //   const dialogRef = this.dialog.open(EditPopupComponent, {
  //     maxHeight: '100vh',
  //     width:'465px',
  //     // panelClass:'yespost',
  //     data: {
  //       img:'../.assets/images/Icon.png',
  //       heading:'Are you sure you want to post this project?',
  //       report:'Yes, delete',
  //       cancel:'Go, back'
  //     }
  //   });
  // }

  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.profileDetails = res.result[0];
      console.log(this.profileDetails)
    })
  }

  goBack(){
    this.commonService.goBack();
  }
  requirementDetail(id:any){
    let dataToPost={
      requirement_id:id
    }
    this.service.get(dataToPost,API_ROUTES.MyRequirements.getRequirementDetail).pipe().subscribe((res=>{
      console.log(res);
      if(this.updateData && this.updateData.length > 0){
        for(let i=0 ; i<this.updateData.length; i++){
      if(this.updateData[i].Auth.CompanyInfo.company_name.toLowerCase() == this.profileDetails.company_name.toLowerCase()){
        this.updateData[i]['editlist'] = true;
      } 
      else{
        this.updateData[i]['editlist'] = false;
      }
    }
  }
      if (res.success) {
        this.updateData = res.result;
        this.pdf = this.updateData.upload_resume
        // this.toastr.error(res.msg)
      }
      
    }))
  }

  deletePost(){
    const dialogRef = this.dialog.open(DeleteComponent, {
      maxHeight: '100vh',
      width:'550px',
      data: {
        img:'assets/images/App_icon.svg',
        // heading:'Post Published'      
        heading:'Hey, do you really want to delete HR requirement? ',
        report:'Yes, delete',
        cancel:'Go, back'
      }
    });
  }

  interestedUser(id:any){
    this.router.navigate(['/main/home/interest-user'],{queryParams: {id: id}});
  }
  editRequirement(id:any){
    this.router.navigate(['/main/home/hr-requirement'],{queryParams: {id: id}});
  }

delete(id:any){
 const dialogRef = this.dialog.open(EditPopupComponent, {
   maxHeight: '100vh',
   width:'465px',
   // panelClass:'yespost',
   data: {
     img:'assets/images/Delete.png',
     heading:'Are you sure want to delete this hr requirement',
     report:'Yes, delete',
     cancel:'Go, back'
   }
 });
 dialogRef.afterClosed().subscribe(result => {
   let dataToDelete = {
     'requirement_id':id
   }
   this.service.delete(dataToDelete,API_ROUTES.MyRequirements.deleteRequirement).pipe().subscribe((res =>{
     console.log(res);
     if (res.success) {
       this.router.navigate(['/main/home']);
     }
      else {
     }
   }))
 });

}
  shareHome(){
    const dialogRef = this.dialog.open(SharebyComponent, {
      maxHeight: '100vh',
      width: '300px',
      panelClass: 'yespost',
    });
    dialogRef.afterClosed().subscribe(data => {
     console.log(data)
     if(data.result==true && data.data==2){
      const dialogRef = this.dialog.open(ShareComponent, {
        maxHeight: '100vh',
        width: '465px',
        panelClass: 'yespost',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      })
     }
     else if(data.result==true && data.data==1){
      let requestBody={
          post_id:this.post_id
        }
     
    this.service.post(requestBody,`${API_ROUTES.Post.sharepost}`,{}).pipe().subscribe((res)=>{
      if(res.success){
        // this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message);
      }
    })
       }
      })
 
  }
  report(detailsData:any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      maxHeight: '100vh',
      width:'465px',
      // panelClass:'yespost',
      data: {
        img:'assets/images/reporticon.svg',
        heading:'Are you Sure want to Report this Requirement?',
        report:'Yes, Report',
        cancel:'Go, back'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const dialogRef = this.dialog.open(ReportComponent, {
          maxHeight: '100vh',
          width:'465px',
          // panelClass:'yespost',
        });
        dialogRef.afterClosed().subscribe(data => {
          console.log('The dialog was closed', data);
          if(data.result == true){
            let  requestBody={
                type:'requirement',
                post_id:detailsData.id,
                reported_by:this.profileDetails.Auth.id,
                content_created_by:detailsData.Auth.id,
                reason_for_report: data.reportData
            }
             this.service.post(requestBody,`${API_ROUTES.MyRequirements.report}`,{}).subscribe((res)=>{
               },
               (error)=>{
                this.toastr.error(error.message);
               }
               )
          }
                     
  })
      }
  })
}
}


