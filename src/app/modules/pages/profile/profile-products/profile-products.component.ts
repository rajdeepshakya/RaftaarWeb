import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.scss']
})
export class ProfileProductsComponent implements OnInit {

isShow=false
  productId: any;
  data: any;
  Media: any[];
  myProfile:any = true;

constructor(private dialog :MatDialog,private storageService:LocalStorageProvider,
  private commonService:CommonService,private activeRoute:ActivatedRoute,private service:ApiServicesService,private router :Router) { }
showdropdown(){
  this.isShow=!this.isShow
}
deletePost(){
  const dialogRef = this.dialog.open(EditPopupComponent, {
    maxHeight: '100vh',
    width:'465px',
    data: {
      img:'../.assets/images/yespost.svg',
      heading:'Hey, do you really want to delete this product?',
      para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
      report:'Yes, delete',
      cancel:'Go back'
    }
  });
}

ngOnInit(): void {
  this.activeRoute.queryParams.subscribe((params) =>{
    this.productId = params?.['id'];
    // console.log(this.machineId)
    this.getList()
   
  })
}

getList(){
  let params;
  if(this.storageService.getItem("currentUser") == "other"){
    this.myProfile = false;
    params = {
      id:this.storageService.getItem("currentUserId")
    }
  }
  else {
    this.myProfile = true
    params = {}
  }
  this.service.get(params,`${API_ROUTES.FeatureProduct.productList}`).pipe().subscribe((res)=>{
    this.data = res.result;
    // this.data=res.result.Media
    for(let i = 0;i<this.data.length;i++){
      let image = this.data[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
    if(image){
      this.data[i].shapeImageUrl = image.url
    }
    else {
      this.data[i].shapeImageUrl='assets/images/placeholder-img.svg'
    }
  }
    console.log(this.data)
  })
}
edit(id:any){
this.router.navigate(['/main/profile/newFeature'],{queryParams:{id:id}})
}
onview(data:any){
  this.router.navigate(['main/profile/product-details'],{queryParams:{id:data}})

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
        this.getList();
        }
    })
  });
}

goBack(){
  this.commonService.goBack();
}
}
