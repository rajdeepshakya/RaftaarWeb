import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { FilterProductComponent } from 'src/app/shared/dialogs/filter-product/filter-product.component';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  show:boolean=false
  cards=[
    {
    heading:'Lorem ipsum dolor sit amet',
    min:'Jan 22, 2022 at 1:30 PM',
    para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
    like:'103 Likes',
    comment:'67 Comments',
    share:'105 Share',
  },
  ]
productName: any;
  productId: any;
  images: any;
  videos: any;
  pdf: any;
  sortby: any;
  filterData: any;
  sortedObject: { sortby: any; };
constructor(
  private dialog:MatDialog,
  private service:ApiServicesService,private activeRoute:ActivatedRoute,private router:Router,private commonService:CommonService) { }
ngOnInit(): void {
  this.activeRoute.queryParams.subscribe((params) =>{
    this.productId = params?.['id'];   
  })
  this.onProductList()
}

goBack(){
  this.commonService.goBack();
}

onProductList(){
  this.service.get({},`${API_ROUTES.Marketplace.myMarketPlaceList}`).pipe().subscribe((res)=>{
    if (res.success) {
      this.productName = res.result
      for(let i = 0;i<this.productName.length;i++){
        if(this.productName[i].Media && this.productName[i].Media[0] && this.productName[i].Media[0].media_type.toLowerCase().includes('image') ){
          this.productName[i].shapeImageUrl = this.productName[i].Media[0].url
        }
        else {
          this.productName[i].shapeImageUrl = 'assets/images/placeholder-img.svg'
        }
      }
      if(this.productName.length === 0 || this.productName==null){
        this.show=true
        }
    } 
  })
}
onview(data:any){
  this.router.navigate(['main/myMarketplace/grindingmachine'],{queryParams:{productId:data,type:1}})

}
edit(id:any){
  this.router.navigate(['/main/marketplace/editproduct'],{queryParams:{id:id}})
  }
  // projectDelete(id:any){
  //   this.service.delete({product_id:id},`${API_ROUTES.Marketplace.deleteProduct}`).pipe().subscribe((res)=>{
  //     if(res.success_code==201){
  //       const dialogRef = this.dialog.open(EditPopupComponent, {
  //         maxHeight: '100vh',
  //         width:'465px',
  //         // panelClass:'yespost',
  //         data: {
  //           img:'assets/images/Delete.png',
  //           heading:'Are you sure you want to delete this product?',
  //           report:'Yes, delete',
  //           cancel:'Go, back'
  //         }
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //          this.service.get({},`${API_ROUTES.Marketplace.mymarketproductList}`).pipe().subscribe((res)=>{
  //            this.productName = res.result;
  //          })
  //       });        
  //       }
      
  //   })
  // }

  delete(id:any){
    const dialogRef=this.dialog.open(DeleteComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'assets/images/Delete.png',
        heading:'Hey, do you really want to delete this product?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, delete',
        cancel:'Go back'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      let dataToDelete = {
        'product_id':id
      }
      this.service.delete(dataToDelete,API_ROUTES.Marketplace.deleteProduct).pipe().subscribe((res =>{
        console.log(res);
        if (res.success) {
          this.productName = [];
          this.onProductList();
        }
         else {
        }
      }))
    });
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
        if(this.sortby != "default" && this.sortby!= "" && this.sortby != undefined){
         this.sortedObject = {
            sortby:this.sortby
          }
        }
        
        let params = {...this.sortedObject,...this.filterData}
        this.service.get(params,`${API_ROUTES.Marketplace.myMarketPlaceList}`).pipe().subscribe((res)=>{
          if (res.success) {
            this.productName = res.result
            for(let i = 0;i<this.productName.length;i++){
              if(this.productName[i].Media && this.productName[i].Media[0] && this.productName[i].Media[0].media_type.toLowerCase().includes('image') ){
                this.productName[i].shapeImageUrl = this.productName[i].Media[0].url
              }
              else {
                this.productName[i].shapeImageUrl = 'assets/images/placeholder-img.svg'
              }
            }
          } 
        })
      }
      

    })
  }

}
