import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { ShareComponent } from '../share/share.component';
import { SharebyComponent } from '../shareby/shareby.component';
import { ReportComponent } from 'src/app/shared/dialogs/report/report.component';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-manufacturing-o-r-home',
  templateUrl: './manufacturing-o-r-home.component.html',
  styleUrls: ['./manufacturing-o-r-home.component.scss']
})
export class ManufacturingORHomeComponent implements OnInit {
  // updateData:any;
  media:any=["https://raftaar-dev.s3.ap-south-1.amazonaws.com/25.png","https://raftaar-dev.s3.ap-south-1.amazonaws.com/25.png","https://raftaar-dev.s3.ap-south-1.amazonaws.com/25.png"]
  media2:any =["https://raftaar-dev.s3.ap-south-1.amazonaws.com/file_example_MP4_480_1_5MG.mp4","https://raftaar-dev.s3.ap-south-1.amazonaws.com/file_example_MP4_480_1_5MG.mp4"]
  images: any =[];
  videos: any = [];
  post_id:any;
  pdf: any=[];
    updateData:any
  profileDetails: any;
  editlist:boolean=false

  constructor(private dialog:MatDialog,private service: ApiServicesService,private toastr:ToastrService,
     private activeRoute:ActivatedRoute,private sanitizer:DomSanitizer,private router:Router,private commonService:CommonService) { }
     
  
  ngOnInit(): void {
    this.getProfile()
    // this.requirementDetail();
    // this.images = this.updateData.Media.filter((element:any) => { if (element.media_type.includes("image")) return element});
    //     this.videos = this.updateData.Media.filter((element:any) => { if (element.media_type.includes("video")) return element});
    //     this.pdf = this.updateData.Media.filter((element:any) => { if (!element.media_type.includes("video") && !element.media_type.includes("image")) return element});
    //     console.log(this.images);
    //     console.log(this.videos);
    //     console.log(this.pdf);
        
    this.activeRoute.queryParams.subscribe((params) =>{
      this.post_id = params?.['id'];  
      this.requirementDetail(this.post_id);
    })
  }

  goBack(){
    this.commonService.goBack();
  }
  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.profileDetails = res.result[0];
      console.log(this.profileDetails)
      this.requirementDetail(this.post_id);

    })
  }

  requirementDetail(data:any){
    let dataToPost={
      requirement_id:data//"a8ff6adf-3410-4437-bda5-694837abd86c"
    }
    this.service.get(dataToPost,API_ROUTES.MyRequirements.getRequirementDetail).pipe().subscribe((res=>{
      console.log(res);
     
      if (res.success) {
        this.updateData = res.result;
        if(this.updateData.Auth.CompanyInfo.company_name.toLowerCase() == this.profileDetails.company_name.toLowerCase()){
          this.updateData['editlist'] = true;
        }
        else{
          this.updateData['editlist'] = false;
        }
        this.images = this.updateData.Media.filter((element:any) => { if (element.media_type.includes("image")) return element});
        this.videos = this.updateData.Media.filter((element:any) => { if (element.media_type.includes("video")) return element});
        this.pdf = this.updateData.Media.filter((element:any) => { if (!element.media_type.includes("video") || !element.media_type.includes("image")) return element});
      //   this.setData();
      // this.setCustomfields();
        
        
        // this.loader.start();
        
      } else {
        this.toastr.error(res.msg)
      }
      
    }))
  }

  interestedUser(id:any){
    this.router.navigate(['/main/home/interest-user'],{queryParams: {id: id}});
  }
  edit(id:any){
         this.router.navigate(['/main/home/manufacturing-o-r'],{queryParams: {id:id}});
    }
    delete(id:any){
      const dialogRef = this.dialog.open(DeleteComponent, {
        maxHeight: '100vh',
        width:'465px',
        // panelClass:'yespost',
        data: {
          img:'assets/images/Delete.png',
          heading:'Hey, do you really want to delete this Manufacturing order Requirement ',
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
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      // panelClass:'yespost',
      data: {
        img:'assets/images/Delete.png',
        heading:'Are you Sure want to Report this Requirement/Post',
        report:'Yes, Report',
        cancel:'Go, back'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
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
              content_created_by:detailsData.Auth.CompanyInfo.id,
              reason_for_report: data.reportData
          }
           this.service.post(requestBody,`${API_ROUTES.MyRequirements.report}`,{}).subscribe((res)=>{
             })
        }
           
            
            
})
  })
}
}
