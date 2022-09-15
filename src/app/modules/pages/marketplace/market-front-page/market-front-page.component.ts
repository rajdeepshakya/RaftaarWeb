import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { SearchService } from 'src/app/services/search.service';
import { FilterProductComponent } from 'src/app/shared/dialogs/filter-product/filter-product.component';

@Component({
  selector: 'app-market-front-page',
  templateUrl: './market-front-page.component.html',
  styleUrls: ['./market-front-page.component.scss']
})
export class MarketFrontPageComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<img src="assets/images/home-1.svg">', '<img src="assets/images/home.svg">'],
    autoplay: false,
    autoplayTimeout: 2000,
    nav: true,
    items: 1,
    
  }
  newArrivalsList: any;
  banner:any = [];
  popularList: any;
  bestSellerList: any;
  subscription:Subscription
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  constructor(private service:ApiServicesService,private searchService:SearchService) { }

  ngOnInit(): void {
    this.bannerList();

    this.subscription = this.searchService.currentMessage.subscribe(text => console.log(text)
    );
    let newArrivalsParams = {
      pageNo:1,
      size:3
    }
    let popularParams = {
      pageNo:1,
      size:3,
      type:'popular'
    }
    let bestSellerParams = {
      pageNo:1,
      size:3,
      type:'bestseller'
    }
    this.marketplaceList(newArrivalsParams);
    this.marketplaceList(popularParams);
    this.marketplaceList(bestSellerParams);
  }

  marketplaceList(params:any){
    this.service.get(params, API_ROUTES.Marketplace.marketPlaceList).pipe().subscribe((res => {
      console.log(res);
      if (res.success) {
        if(params.type && params.type == 'popular'){
          this.popularList = res.result;
          
          for(let i = 0;i<this.popularList.length;i++){
            let image = this.popularList[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
          if(image){
            this.popularList[i].shapeImageUrl = image.url
          }
          else {
            this.popularList[i].shapeImageUrl='assets/images/placeholder-img.svg'
          }
            // if(this.popularList[i].Media && this.popularList[i].Media[0] && this.popularList[i].Media[0].media_type.toLowerCase().includes('image') ){
            //   this.popularList[i].shapeImageUrl = this.popularList[i].Media[0].url
            // }
            // else {
            //   this.popularList[i].shapeImageUrl='assets/images/placeholder-img.svg'
            // }
          }
          console.log(this.popularList);
          
        }
        else if(params.type && params.type == 'bestseller'){
          this.bestSellerList = res.result
          for(let i = 0;i<this.bestSellerList.length;i++){
            let image = this.bestSellerList[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
            if(image){
              this.bestSellerList[i].shapeImageUrl = image.url
            }
            else {
              this.bestSellerList[i].shapeImageUrl='assets/images/placeholder-img.svg'
            }
            // if(this.bestSellerList[i].Media && this.bestSellerList[i].Media[0] && this.bestSellerList[i].Media[0].media_type.toLowerCase().includes('image') ){
            //   this.bestSellerList[i].shapeImageUrl = this.bestSellerList[i].Media[0].url
            // }
            // else {
            //   this.bestSellerList[i].shapeImageUrl='assets/images/placeholder-img.svg'
            // }
          }
          console.log(this.bestSellerList);
          
        }
        else {
          this.newArrivalsList = res.result;
          for(let i = 0;i<this.newArrivalsList.length;i++){
            let image = this.newArrivalsList[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
            if(image){
              this.newArrivalsList[i].shapeImageUrl = image.url
            }
            else {
              this.newArrivalsList[i].shapeImageUrl='assets/images/placeholder-img.svg'
            }
            // if(this.newArrivalsList[i].Media && this.newArrivalsList[i].Media[0] && this.newArrivalsList[i].Media[0].media_type.toLowerCase().includes('image') ){
            //   this.newArrivalsList[i].shapeImageUrl = this.newArrivalsList[i].Media[0].url
            // }
            // else {
            //   this.newArrivalsList[i].shapeImageUrl='assets/images/placeholder-img.svg'
            // }
          }
          console.log(this.newArrivalsList);
          
        }
      } else {
      }

    }))
  }

  bannerList(){
    this.service.get({}, API_ROUTES.Account.bannerList).pipe().subscribe((res => {
      console.log(res);
      if(res.result.List && res.result.List.length > 0){
        res.result.List.forEach((val:any)=>{
          if (val.image) {
            this.banner.push(val.image)
          }
        })
      }
       

    }))
  }

}
