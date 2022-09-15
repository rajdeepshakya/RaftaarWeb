import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  companyProfile:any;
  profileDetails: any;
  location:boolean=false;
  url:any
  profileurl: string | ArrayBuffer | null;
  profileForm:FormGroup
  profleCover: any;
  profile_pic: string;


  constructor(private service: ApiServicesService,private fb:FormBuilder,private storageService:LocalStorageProvider) { }

  ngOnInit(): void {
    this.getProfile()
    // this.profileForm = this.fb.group({
    //   profile_pic:[''],
    //   profile_cover:['']

    //   })
        
    }

  getProfile(){
    let params;
    if(this.storageService.getItem("currentUser") == "other"){
      params = {
        id:this.storageService.getItem("currentUserId")
      }
    }
    else {
      params = {}
    }
    this.service.get(params,`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.profileDetails = res.result[0];
      console.log(this.profileDetails)
      if(this.profileDetails.profile_pic!==null){
        this.profileDetails.profileurl = this.profileDetails.profile_pic
      }
      else {
        this.profileDetails.profileurl='assets/images/Profile_1.svg'
      }
     
      
    })
  }
  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profile_pic = reader.result as string;
        this.profileForm.patchValue({
          profile_pic: reader.result

        });
      };
    }

  }

//   submit(){
//   console.log(this.profileForm.value);
//    this.service.put( this.profileForm.value,{},`${API_ROUTES.More.changepic}`).pipe().subscribe((res)=>{
//     console.log(res)
//   })

// }
setData(){
  this.profileForm.patchValue({
    profile_pic:this.profileDetails.profileurl,
    profile_cover:this.profileDetails.profile_cover

  })

}
}
