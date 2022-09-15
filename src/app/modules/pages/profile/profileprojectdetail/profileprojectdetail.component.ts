import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { SubjectserviceService } from 'src/app/services/subjectService/subjectservice.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { ShareTestimonialComponent } from 'src/app/shared/dialogs/share-testimonial/share-testimonial.component';
import { ShareComponent } from '../../home/share/share.component';
import { SharebyComponent } from '../../home/shareby/shareby.component';
@Component({
  selector: 'app-profileprojectdetail',
  templateUrl: './profileprojectdetail.component.html',
  styleUrls: ['./profileprojectdetail.component.scss']
})

export class ProfileprojectdetailComponent implements OnInit {
showdate:boolean=true;
showLive:boolean=false;
  // slidesStore: any = [
    
  //   '../../.assets/images/Rectangle150882.svg',
  //   '../../.assets/images/Rectangle150882.svg',
  //   '../../.assets/images/Rectangle150882.svg'
    
  // ]


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
  projectsName:any;
  projectId: any;
  Highlights: any;
  updateUserInfo: any;
  myProfile:boolean = true;
  constructor(private dialog:MatDialog,private subjectService:SubjectserviceService,private toastr:ToastrService,private storageService:LocalStorageProvider,
    private service :ApiServicesService,private commonService:CommonService,
    private activeRoute: ActivatedRoute,private router:Router) { }

  openShareTestimonial(){
    const dialogRef = this.dialog.open(ShareTestimonialComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'ShareTestimonial',
      data: {
      }
    });
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.projectId = params?.['projectId'];
      console.log(this.projectId)


    })
    this.onUserDetails();
    if(this.storageService.getItem("currentUser") == "other"){
      this.myProfile = false;
    }
    else {
      this.myProfile = true;
    }
    this.subjectService.getNewUserInfo().subscribe(info => {
      this.updateUserInfo = info;
    })
  }
  onUserDetails(){
    this.service.get({projectId:this.projectId},`${API_ROUTES.Projects.projectsDetail}`).pipe().subscribe((res)=>{
      this.projectsName = res.result;
      this.Highlights=res.result.Highlights
      if(this.projectsName.is_live==true){
        this.showLive=true;
        this.showdate=false
      }
      this.projectsName.slides = [];
              if(this.projectsName.Media.length > 0){
                for(let i=0;i<this.projectsName.Media.length;i++){
                  let slide = {
                    url:this.projectsName.Media[i].url,
                    type: ''
                  }
                  if(this.projectsName.Media[i].media_type.toLowerCase().includes('image')){
                    slide.type = 'image';
                    this.projectsName.slides.push(slide);
                  }
                  else if(this.projectsName.Media[i].media_type.toLowerCase().includes('video')){
                    slide.type = 'video';
                    this.projectsName.slides.push(slide);
                  }
                  else {
                    slide.type = 'pdf';
                    slide.url = 'assets/images/homePdf.png';
                    this.projectsName.slides.push(slide);
                  }
                }
              }
      console.log(this.projectsName)
    })
  }

 
  projectDelete(id:any){
    const dialogRef=this.dialog.open(DeleteComponent,{
      maxHeight: '100vh',
      width:'400px',
      data: {
        img:'assets/images/Delete.png',
        heading:'Hey, do you really want to delete this project?',
        // para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, delete',
        cancel:'Go back'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.service.delete({project_id:id},`${API_ROUTES.Projects.deleteProject}`).pipe().subscribe((res)=>{
        this.projectsName = res.result;
        this.router.navigate(['/main/profile/projects'])
        console.log(this.projectsName)
      })
    });
  }

  edit(id:any){
    this.router.navigate(['/main/profile/newProjects'],{queryParams:{id:id}})
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
    this.service.post(data,`${API_ROUTES.Post.sharepost}`,{}).pipe().subscribe((res)=>{
      if(res.success){
        this.toastr.success(res.message);
        this.onUserDetails();
      }else{
        this.toastr.error(res.message);
      }
    })
       
      })
 
  }

  goBack(){
    this.commonService.goBack();
  }
}
