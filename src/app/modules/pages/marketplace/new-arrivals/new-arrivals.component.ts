import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { FilterProductComponent } from 'src/app/shared/dialogs/filter-product/filter-product.component';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {
  list: any;
  sortedObject: any;
  filterData: any;
  sortby: any;
  page:number=1;
  count: number = 0;
  Size: number = 20;
  constructor(private loader:NgxUiLoaderService,private service:ApiServicesService,private dialog:MatDialog,
    private commonService:CommonService) { }

  ngOnInit(): void {
    this.List()
  }

  goBack(){
    this.commonService.goBack();
  }

  List(){
    this.loader.start();
    let page:any;
    page={
      pageNo:this.page,
      size:this.Size,
      sortby:this.sortby
    }
    Object.keys(page).forEach(key => {
      if (page[key] == null || page[key] == "" || page[key] == "default") {
        delete page[key];
      }
    });
    if(this.filterData){
      page = {...page,...this.filterData}
    }
    this.service.get(page, API_ROUTES.Marketplace.marketPlaceList).pipe().subscribe((res => {
      this.loader.stop();
      console.log(res);
      if (res.success) {
          this.list = res.result;
          for(let i = 0;i<this.list.length;i++){
            let image = this.list[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
            if(image){
              this.list[i].shapeImageUrl = image.url
            }
            else {
              this.list[i].shapeImageUrl='assets/images/placeholder-img.svg'
            }
            // if(this.list[i].Media && this.list[i].Media[0] && this.list[i].Media[0].media_type.toLowerCase().includes('image') ){
            //   this.list[i].shapeImageUrl = this.list[i].Media[0].url
            // }
            // else {
            //   this.list[i].shapeImageUrl='assets/images/placeholder-img.svg'
            // }
          }
      } else {
      }
  
    }))
  }

  filterDialog(){
    const dialogRef=this.dialog.open(FilterProductComponent,{
      maxHeight:'100vh',
      width:'421px',
      panelClass:'filter',
      data: {
        sortBy:this.sortby,
        filterBy:this.filterData
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed', data);
      if(data.result == true){
        if(data.sortdata){
          for(let i =0;i<data.sortdata.length;i++){
            if(data.sortdata[i].isSelected == true){
              this.sortby = data.sortdata[i].value
            }
          }
          console.log(this.sortby);
          
        }
        if(data.filterdata){
          Object.keys(data.filterdata).forEach(key => {
            if (data.filterdata[key] == '' || data.filterdata[key] == "0") {
              delete data.filterdata[key];
            }
          });
          this.filterData = data.filterdata
          // console.log(this.filterData);
          
          // console.log(data.filterdata);
          
        }
        if(this.sortby != "default" && this.sortby!= "" && this.sortby !=undefined){
         this.sortedObject = {
            sortby:this.sortby
          }
        }
        
        let params = {...this.sortedObject,...this.filterData}
        this.service.get(params, API_ROUTES.Marketplace.marketPlaceList).pipe().subscribe((res => {
          console.log(res);
          if (res.success) {
              this.list = res.result;
              for(let i = 0;i<this.list.length;i++){
                let image = this.list[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
            if(image){
              this.list[i].shapeImageUrl = image.url
            }
            else {
              this.list[i].shapeImageUrl='assets/images/placeholder-img.svg'
            }
                // if(this.list[i].Media && this.list[i].Media[0] && this.list[i].Media[0].media_type.toLowerCase().includes('image') ){
                //   this.list[i].shapeImageUrl = this.list[i].Media[0].url
                // }
                // else {
                //   this.list[i].shapeImageUrl='assets/images/placeholder-img.svg'

                // }
              }
          } else {
          }
      
        }))
      }
      

    })
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      this.Size = this.Size + 20;
      this.List();
    }
  }
  
  onDataChange(event: any) {
    this.page = event;
    this.List();
  }
}
