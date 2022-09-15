import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-profileabout',
  templateUrl: './profileabout.component.html',
  styleUrls: ['./profileabout.component.scss']
})
export class ProfileaboutComponent implements OnInit {
  profileDetails: any;
  subcategory:any;
  subCategory:any=[];
  myProfile:boolean = true;

  constructor(private service:ApiServicesService,private storageService:LocalStorageProvider,private commonService:CommonService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    let params;
    if(this.storageService.getItem("currentUser") == "other"){
      this.myProfile = false;
      params = {
        id:this.storageService.getItem("currentUserId")
      }
    }
    else {
      this.myProfile = true;
      params = {}
    }
    this.service.get(params,`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.profileDetails = res.result[0];
      this.subcategory = res.result[2];
      this.subcategory.CategoryL3.forEach((val:any)=> this.subCategory.push(val.title));
    this.subCategory = this.subCategory.join(", ");
      
    })
  }

  goBack(){
    this.commonService.goBack();
  }

}
