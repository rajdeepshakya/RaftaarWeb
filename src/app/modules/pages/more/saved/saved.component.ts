import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { ReportComponent } from 'src/app/shared/dialogs/report/report.component';
import { ShareComponent } from '../../home/share/share.component';
import { SharebyComponent } from '../../home/shareby/shareby.component';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  // cards=[
  //   {
  //   heading:'Unisense Digital Agency',
  //   min:'Jan 22, 2022 at 1:30 PM',
  //   para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
  //  interest:'Show Interests',
  //  unSave:'Unsave',
  //  share:'105 Share',
  //  img:'../../.assets/images/img1.svg'
  // },
  // {
  //   heading:'Unisense Digital Agency',
  //   min:'Jan 22, 2022 at 1:30 PM',
  //   para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
  //  interest:'Show Interests',
  //  unSave:'Unsave',
  //  share:'105 Share',
  //  img:'../../.assets/images/img2.svg'
  // },
  // {
  //   heading:'Unisense Digital Agency',
  //   min:'Jan 22, 2022 at 1:30 PM',
  //   para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
  //  interest:'Show Interests',
  //  unSave:'Unsave',
  //  share:'105 Share',
  //  img:'../../.assets/images/img3.svg'
  // },
  // ]
  // isShow=false
  cards:any=[];
  profileDetails:any =[];
  icons:any={
    'units': 'assets/images/bill_3.svg',
    'price': 'assets/images/price.svg',
    'date': 'assets/images/calendar_2.svg',
    'capacity': 'assets/images/capacity.svg',
    'contact': 'assets/images/call.svg',
    'gst': 'assets/images/archive-book.svg',
    'lead': 'assets/images/clock_2.svg',
}
  text: string;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<img src="assets/images/home-1.svg">', '<img src="assets/images/home.svg">'],
    autoplay: false,
    autoplayTimeout: 2000,
    items: 1,
    nav: true
  }
  constructor(private service:ApiServicesService,private router:Router,
    private commonService:CommonService,public dialog:MatDialog,private toastr:ToastrService) { }
  // showdropdown(){
  //   this.isShow=!this.isShow
  // }
  ngOnInit(): void {
    this.getList();
    this.getProfile();
  }

  getList(){
    this.service.get({},API_ROUTES.MyRequirements.SaveList).pipe().subscribe((res => {
      console.log(res);
      if (res.success) {
        this.cards = res.result;
        for(let i =0; i<this.cards.length;i++){
          this.cards[i].slides = [];
          if(this.cards[i].Requirement!= false && this.cards[i].Requirement != null){
            if(this.cards[i].Requirement.req_type.toLowerCase() == 'hr'){
              let slide = {
                url:'assets/images/homePdf.png',
                type: 'pdf'
              }
              this.cards[i].slides.push(slide);
            }
            else {
              if(this.cards[i].Requirement.Media.length > 0){
                for(let j=0;j<this.cards[i].Requirement.Media.length;j++){
                  let slide = {
                    url:this.cards[i].Requirement.Media[j].url,
                    type: ''
                  }
                  if(this.cards[i].Requirement.Media[j].media_type.toLowerCase().includes('image')){
                    slide.type = 'image';
                    this.cards[i].slides.push(slide);
                  }
                  else if(this.cards[i].Requirement.Media[j].media_type.toLowerCase().includes('video')){
                    slide.type = 'video';
                    this.cards[i].slides.push(slide);
                  }
                  else {
                    slide.type = 'pdf';
                    slide.url = 'assets/images/homePdf.png';
                    this.cards[i].slides.push(slide);
                  }
                }
              }
            }
      }
        }
        console.log(this.cards);
        
        // for (let [key, value] of Object.entries(res.result)) {
        //   this.cards.push(value);
        //   }
      // this.cards = this.cards.filter((element:any) => { if (element.req_type.toLowerCase()== "manufacturing order requirement") return element});
        
      } else {
      }

    }))
  }

  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.profileDetails = res.result[0];
      console.log(this.profileDetails)
      // if(this.profileDetails.profile_pic!==null){
      //   this.profileDetails.profileurl = this.profileDetails.profile_pic
      // }
      // else {
      //   this.profileDetails.profileurl='assets/images/Profile_1.svg'
      // }
      // if(this.profileDetails.Industry && this.profileDetails.Industry.industry_name!=null){
      // this.profileIndustry=true
      // }
      // if(this.profileDetails.Category1.title!=null){
      //   this.profileCategory=true
      // }
      // if(this.profileDetails.company_size!=null){
      //   this.profileCompSize=true
      // }
      // if(this.profileDetails.gst_no!=null && this.profileDetails.gst_no != ""){
      //   this.gstdata=true
      // }
      // if(this.profileDetails.address!=null){
      //   this.location=true
      // }
      
    })
  }

  edit(data:any,type:any){

  }

  deleteRequirement(data:any,type:any){

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
          let requestBody = {
            type:'requirement',
            requirement_id:detailsData.id,
              reported_by:this.profileDetails.Auth.id,
              content_created_by:detailsData.Auth.id,
              reason_for_report: data.reportData
          }
          // else if (detailsData.type.toLowerCase() == 'requirement'){
          //   requestBody={
          //     type:'requirement',
          //     requirement_id:detailsData.Requirement.id,
          //     reported_by:this.profileDetails.Auth.id,
          //     content_created_by:detailsData.Requirement.Auth.CompanyInfo.id,
          //     reason_for_report: data.reportData

          //    }            }
          
           this.service.post(requestBody,`${API_ROUTES.MyRequirements.report}`,{}).subscribe((res)=>{
           
             })
        }
           
            
            
})
  })
}

onview(data:any){
  // console.log(data,"daataaa")
  if(data.req_type.toLowerCase()=="manufacturing order requirement"){
    this.router.navigate(['/main/home/manufacturing-o-r_home'],{queryParams: {id: data.id}});
  }
  else if(data.req_type.toLowerCase()=="other"){
    this.router.navigate(['/main/home/other_home'],{queryParams: {id: data.id}});
  }
  else if(data.req_type.toLowerCase()=="hr"){
    this.router.navigate(['/main/home/hr-requirement_home'],{queryParams: {id: data.id}});
  }
  else if(data.req_type.toLowerCase()=="machine"){
    this.router.navigate(['/main/home/machine_home'],{queryParams: {id: data.id}});
  }
  else if(data.req_type.toLowerCase()=="raw material"){
    this.router.navigate(['/main/home/raw-mat_home'],{queryParams: {id: data.id}});
  }
  else if(data.req_type.toLowerCase()=="finance"){
    this.router.navigate(['/main/home/finance_home'],{queryParams: {id: data.id}});
  }

}

  showinterest(id:any){
    let params = {
      req_id: id
    }
    this.service.post({},`${API_ROUTES.MyRequirements.showinterest}`,params).pipe().subscribe((res)=>{
      if(res.success){
        this.getList();
        // this.toastr.success(res.message);
        // this.router.navigate(['/main/chat/chatHello'],{queryParams:{post_id:id}})
      }else{
        this.toastr.error(res.message);
      }
    })
  }

  unsaveRequirement(id:any){
    let params = {
      requirement_id: id
    }
    this.service.delete(params,`${API_ROUTES.MyRequirements.unSave}`).pipe().subscribe((res)=>{
      if(res.success){
        this.getList();
        // this.toastr.success(res.message);
        // this.router.navigate(['/main/chat/chatHello'],{queryParams:{post_id:id}})
      }else{
        this.toastr.error(res.message);
      }
    })

  }

  shareHome(id:any){
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
        requirement_id:id
      }
     
    this.service.post(requestBody,`${API_ROUTES.Post.sharepost}`,{}).pipe().subscribe((res)=>{
      if(res.success){
        // this.toastr.success(res.message);
        this.getList();
      }else{
        this.toastr.error(res.message);
      }
    })
       }
      })
 
  }

  goBack(){
    this.commonService.goBack()
  }

  // edit(data:any){
  //   // this.dataService.setData('editFlag',true);
  //   // this.dataService.setData('editId',data.id);
  //   if(data.req_type.toLowerCase()=="manufacturing order requirement"){
  //     this.router.navigate(['/main/home/manufacturing-o-r'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="other"){
  //     this.router.navigate(['/main/home/other'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="hr"){
  //     this.router.navigate(['/main/home/hr-requirement'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="machine"){
  //     this.router.navigate(['/main/home/machine-requirement'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="raw material"){
  //     this.router.navigate(['/main/home/raw-material'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="finance"){
  //     this.router.navigate(['/main/home/finance'],{queryParams: {id: data.id}});
  //   }
  // }

  // openDetails(data:any){
  //   if(data.req_type.toLowerCase()=="manufacturing order requirement"){
  //     this.router.navigate(['/main/home/manufacturing-o-r_home'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="other"){
  //     this.router.navigate(['/main/home/other_home'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="hr"){
  //     this.router.navigate(['/main/home/hr-requirement_home'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="machine"){
  //     this.router.navigate(['/main/home/machine_home'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="raw material"){
  //     this.router.navigate(['/main/home/raw-mat_home'],{queryParams: {id: data.id}});
  //   }
  //   else if(data.req_type.toLowerCase()=="finance"){
  //     this.router.navigate(['/main/home/finance_home'],{queryParams: {id: data.id}});
  //   }
  // }

  // delete(id:any,type:any){
  //   if(type==1){
  //     this.text='Hey, do you really want to delete this manufacturing order requirement?';
  //   }
  // else if(type==2){
  // this.text='Hey, do you really want to delete this HR Requirement?'
  // }
  // else if(type==3){
  //   this.text='Hey, do you really want to delete this machine?'
  //     }
  //     else if(type==4){
  //       this.text='Hey, do you really want to delete this raw material?'
  //         }
  //         else if(type==5){
  //           this.text='Hey, do you really want to delete this finance?'
  //             }
  //             else if(type==6){
  //               this.text='Hey, do you really want to delete this other?'
  //                 }
  //   const dialogRef = this.dialog.open(EditPopupComponent, {
  //     maxHeight: '100vh',
  //     width:'465px',
  //     // panelClass:'yespost',
  //     data: {
  //       img:'assets/images/Delete.png',
  //       heading:this.text,
  //       report:'Yes, delete',
  //       cancel:'Go, back'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
      
  //     let dataToDelete = {
  //       'requirement_id':id
  //     }
  //     this.service.delete(dataToDelete,API_ROUTES.MyRequirements.deleteRequirement).pipe().subscribe((res =>{
  //       console.log(res);
  //       if (res.success) {
  //         this.cards = [];
  //         this.getList();
  //       }
  //        else {
  //       }
  //     }))
  //   });
  
  // }

}
