import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { bool } from 'aws-sdk/clients/signer';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { FilterProductComponent } from 'src/app/shared/dialogs/filter-product/filter-product.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.scss']
})
export class ProductCatalogueComponent implements OnInit {
  isShow=false
  data: any;
  sortby: any;
  filterData: any;
  page:number=1;
  count: number = 0;
  Size: number = 20;
  show:boolean=true
  sortedObject: { sortby: any; };
  constructor(private toastr:ToastrService, private dialog:MatDialog,private service:ApiServicesService,private router:Router) { }
  // showdropdown(index:any){
  //   // this.isShow=!this.isShow
  //   for(let i=0;i<this.cards.length;i++){
  //     if(index == i){
  //       this.cards[i].checked = !this.cards[i].checked
  //     } else {
  //       this.cards[i].checked = false
  //     }
  //   }
  // }
    ngOnInit(): void {
      this.productList();
    }
    @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if (pos == max) {
        this.Size = this.Size + 20;
        this.productList();
      }
    }
    productList(){
      let page={
        pageNo:this.page,
        size:this.Size
      }
      this.service.get(page, API_ROUTES.Marketplace.mymarketproductList).pipe().subscribe((res) => {
        console.log(res);
        this.show=false
        this.data = res.result
        
        for(let i=0;i<this.data.length;i++){
          let image = this.data[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
            if(image){
              this.data[i].shapeImageUrl = image.url
            }
            else {
              this.data[i].shapeImageUrl='assets/images/placeholder-img.svg'
            }
        }
        if(this.data.length === 0 || this.data==null){
        this.show=true
        }
        // if(res.success==false){
        //    this.show=true
        // }

      // if(res.result == null || res.result === 0 || res.result.length === 0){
        //   this.show=true
        // }
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
              if (data.filterdata[key] == '' || data.filterdata[key]== "0") {
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
          this.service.get(params, API_ROUTES.Marketplace.mymarketproductList).pipe().subscribe((res) => {
            console.log(res);
            this.data = res.result
            for(let i=0;i<this.data.length;i++){
              let image = this.data[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
            if(image){
              this.data[i].shapeImageUrl = image.url
            }
            else {
              this.data[i].shapeImageUrl='assets/images/placeholder-img.svg'
            }
            }
          });
        }
        
  
      })
    }
    marketplace(data:any){
      if(data.is_live){
        const dialogRef = this.dialog.open(PostPublishComponent, {
          maxHeight: '100vh',
          width:'465px',
          panelClass:'products',
          data: {
            // img:'assets/images/Success.png',
            heading:'Already Shared to MarketPlace',
            // title:'Your product has been successfully added',
            btn:'Okay'


          }
          
        }
        );
        dialogRef.afterClosed().subscribe(result => {
          
          console.log('The dialog was closed', result);

          // this.router.navigate(['/main/myMarketplace'],{queryParams:{id:id}})
        });
      }
      else {
        this.service.put({},{'productId':data.id}, API_ROUTES.Marketplace.shareToMarketPlace).pipe().subscribe((res) => {
          console.log(res);
          
          this.data = res.result;

        });
      }
      
    }
    delete(id:any){
      const dialogRef=this.dialog.open(DeleteComponent,{
        maxHeight: '100vh',
        width:'465px',
        data: {
          img:'assets/images/Delete.png',
          heading:'Hey, do you really want to delete this product?',
          // para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
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
            this.data = [];
            this.productList();
          }
           else {
          }
        }))
      });
    }

    edit(id:any){
      this.router.navigate(['/business/productCatalogue/add-product'],{queryParams: {id:id}});
 
    }

    openDetail(id:any){
      this.router.navigate(['/business/productCatalogue/product-catalogue-details'],{queryParams: {id:id}});
    }
    onDataChange(event: any) {
      this.page = event;
      this.productList();
    }
}
