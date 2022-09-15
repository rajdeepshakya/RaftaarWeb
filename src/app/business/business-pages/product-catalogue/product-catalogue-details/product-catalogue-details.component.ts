import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions, } from 'ngx-owl-carousel-o';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-product-catalogue-details',
  templateUrl: './product-catalogue-details.component.html',
  styleUrls: ['./product-catalogue-details.component.scss']
})
export class ProductCatalogueDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<img src="assets/images/Arrow_left_border.svg">', '<img src="assets/images/Arrow_right_border.svg">'],
    autoplay: true,
    autoplayTimeout: 2000,
    items: 1,
    nav: true
  }
  images: any=[]
  id: any;
  data: any;
  imageObject:any = [];

  
  constructor(private activeRoute:ActivatedRoute,private service:ApiServicesService) {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.id = params?.['id'];
    })
   }

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail(){
    let product = {
      productId: this.id
    }
    this.service.get(product, API_ROUTES.Marketplace.productDetails).pipe().subscribe((res) => {
      console.log(res);
      this.data = res.result
      // this.images = this.data.Media.filter((el:any)=>
      //       el.media_type.toLowerCase().includes('image')
      //     )
      if(this.data.Media && this.data.Media.length >0){
        for(let i = 0;i<this.data.Media.length;i++){
          let image = {
            image: this.data.Media[i].url,
            thumbImage: this.data.Media[i].url,
            alt: this.data.Media[i].url,
            title: '',
            type: 'image',
            id: i
          }
          let video = {
            image: this.data.Media[i].url,
            posterImage: this.data.Media[i].url,
            title: '',
            alt:this.data.Media[i].url,
            type: 'video',
            id:i
          }
          let pdf = {
            image: 'assets/images/homePdf.png',
            thumbImage: 'assets/images/homePdf.png',
            alt: this.data.Media[i].url,
            title: '',
            type:'pdf',
            id:i
          }
          if(this.data.Media[i] && this.data.Media[i] && this.data.Media[i].media_type.toLowerCase().includes('image') ){
            this.data.Media[i].type = "image";
            this.imageObject.push(image);
          }
          else if(this.data.Media[i] && this.data.Media[i] && this.data.Media[i].media_type.toLowerCase().includes('video')) {
            this.data.Media[i].type = "video";
            this.imageObject.push(video);
          }
          else {
            this.data.Media[i].type = "pdf";
            this.imageObject.push(pdf);
          }
        }
        console.log(this.data);
        
      }
    });
  }

}
