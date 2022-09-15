import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { ShareTestimonialComponent } from 'src/app/shared/dialogs/share-testimonial/share-testimonial.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

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
  productId: any;
  myProfile:boolean = true;
  constructor(private dialog:MatDialog,
    private service :ApiServicesService,
    private activeRoute: ActivatedRoute,
    private router:Router,private storageService:LocalStorageProvider,
    private commonService:CommonService) { }

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
      this.productId = params?.['id'];
      console.log(this.productId)


    })
    if(this.storageService.getItem("currentUser") == "other"){
      this.myProfile = false;
    }
    else {
      this.myProfile = true;
    }
    this.onUserDetails();
  }
  onUserDetails(){
    this.service.get({productId:this.productId},`${API_ROUTES.FeatureProduct.productDetails}`).pipe().subscribe((res)=>{
      this.projectsName = res.result;
      this.Highlights=res.result.Highlights
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
                    slide.url = 'assets/images/docu.svg';
                    this.projectsName.slides.push(slide);
                  }
                }
              }
      console.log(this.projectsName)
    })
  }


  productDelete(id:any){
    const dialogRef=this.dialog.open(DeleteComponent,{
      maxHeight: '100vh',
      width:'400px',
      data: {
        img:'assets/images/Delete.png',
        heading:'Hey, do you really want to delete this product?',
        // para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, delete',
        cancel:'Go back'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.service.delete({productId:id},`${API_ROUTES.FeatureProduct.deleteProduct}`).pipe().subscribe((res)=>{
        if(res.success_code==201){
          this.router.navigate(['/main/profile/products'])
          }
      })
    });
  }


  edit(id:any){
    this.router.navigate(['/main/profile/newFeature'],{queryParams:{id:id}})
  }

  goBack(){
    this.commonService.goBack();
  }
}
