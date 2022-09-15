import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { SubjectserviceService } from 'src/app/services/subjectService/subjectservice.service';
import { InterestedComponent } from 'src/app/shared/dialogs/interested/interested.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-grinding-machine',
  templateUrl: './grinding-machine.component.html',
  styleUrls: ['./grinding-machine.component.scss']
})
export class GrindingMachineComponent implements OnInit {
  productName: any;
  images: any=[];
  videos: any=[];
  pdf: any=[];
  productId: any;
  type: any;
  Media: any=[];
  imageObject:any = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin:10,
    navSpeed: 700,
    navText: ['<img src="assets/images/Arrow_left_border.svg">', '<img src="assets/images/Arrow_right_border.svg">'],
    autoplay: false,
    autoplayTimeout: 2000,
   items: 1,
    nav: true
  }

  constructor( public datepipe :DatePipe,private dialog:MatDialog,private subjectService:SubjectserviceService,
    private service :ApiServicesService,
    private activeRoute: ActivatedRoute,
    private toastr:ToastrService,private location:Location) {
      this.activeRoute.queryParams.subscribe((params) =>{
        this.productId = params?.['productId'];
        this.type = params?.['type'];
          })
     }
    
  ngOnInit(): void {
    this.getProductDetails()
   
  }

  imageOnClick(ev: any) {
    console.log(ev);
    for (let i = 0; i < this.imageObject.length; i++) {
      if (ev == i && this.imageObject[i].type == 'pdf') {
        let element = document.createElement('a');
        element.setAttribute('href', this.imageObject[i].alt);
        // element.setAttribute('download', "a");
        document.body.appendChild(element);
        element.click();
      }
    }

  }
  getProductDetails(){
    this.service.get({productId:this.productId},`${API_ROUTES.Marketplace.productDetails}`).pipe().subscribe((res)=>{
      console.log(this.productName);
        if (res.success) {
          this.productName = res.result
          console.log(this.productName.Media);
          this.Media = this.productName.Media
          this.images = this.productName.Media.filter((el:any)=>
            el.media_type.toLowerCase().includes('image')
          )
          if(this.productName.Media && this.productName.Media.length >0){
          for(let i = 0;i<this.productName.Media.length;i++){
            let image = {
              image: this.productName.Media[i].url,
              thumbImage: this.productName.Media[i].url,
              alt: this.productName.Media[i].url,
              title: '',
              type: 'image',
              id: i
            }
            let video = {
              image: this.productName.Media[i].url,
              posterImage: this.productName.Media[i].url,
              title: '',
              alt:this.productName.Media[i].url,
              type: 'video',
              id:i
            }
            let pdf = {
              image: 'assets/images/homePdf.png',
              thumbImage: 'assets/images/homePdf.png',
              alt: this.productName.Media[i].url,
              title: '',
              type:'pdf',
              id:i
            }
            if(this.productName.Media[i] && this.productName.Media[i] && this.productName.Media[i].media_type.toLowerCase().includes('image') ){
              this.productName.Media[i].type = "image";
              this.imageObject.push(image);
            }
            else if(this.productName.Media[i] && this.productName.Media[i] && this.productName.Media[i].media_type.toLowerCase().includes('video')) {
              this.productName.Media[i].type = "video";
              this.imageObject.push(video);
            }
            else {
              this.productName.Media[i].type = "pdf";
              this.imageObject.push(pdf);
            }
          }
          console.log(this.productName);
          
        }
        } 
        
    })
  }
  goBack(){
    this.location.back();
  }
  interested(){
    const dialogRef = this.dialog.open(InterestedComponent, {
      maxHeight: '100vh',
      width:'465px',
      // panelClass:'products',
      data: {
        img:'assets/images/Success.png',
        heading:'Product Added Successfully',
        title:'Your product has been successfully added',
        btn:'Okay'
      }
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      if(result && result.data!="" && result.data!=null && result.data!=undefined){
        let payload = {
          price: Number(result.data)
        }
        let param = {
          product_id:this.productName.id
        }
        this.service.post(payload,`${API_ROUTES.Marketplace.showInterest}`,param).pipe().subscribe((res)=>{
          const dialogRef=this.dialog.open(PostPublishComponent,{
            maxHeight: '100vh',
            width:'465px',
            height:'400px',
            panelClass:'resetPassword',
            data: {
              img:'assets/images/Completed_check.svg',
              heading:'',
              title:'Your request has been sent',
              image:'assets/images/logout_3.svg',
              btn:'Okay'
            }
          })
          dialogRef.afterClosed().subscribe(result => {
            this.getProductDetails();
          });
            
        },
        (error)=>{
          this.toastr.error(error.message)
        })
      }
      // else {
      //   const dialogRef=this.dialog.open(PostPublishComponent,{
      //     maxHeight: '100vh',
      //     width:'465px',
      //     height:'400px',
      //     panelClass:'resetPassword',
      //     data: {
      //       img:'assets/images/Completed_check.svg',
      //       heading:'',
      //       title:'Your request has been sent',
      //       image:'assets/images/logout_3.svg',
      //       btn:'Okay'
      //     }
      //   })
      //   dialogRef.afterClosed().subscribe(result => {
      //     this.getProductDetails();
      //   });
      // }
    }
  });
}
}
