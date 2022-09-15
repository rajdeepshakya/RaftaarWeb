import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { LogoutComponent } from 'src/app/shared/dialogs/logout/logout.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {
  editProfile: boolean = false;
  currentUrl: any;
  companyProfile: any;
  profileDetails: any;
  location:boolean=false;
  url:any
  profileurl: string | ArrayBuffer | null;
  profileForm:FormGroup
  profleCover: any;
  profile_pic: string;

  constructor(private fb:FormBuilder, private service:ApiServicesService,private dialog:MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      profile_pic:[''],
      profile_cover:['']

      })
    this.getProfile();
    // console.log(this.route.url);
    this.currentUrl = this.route.url
    if(this.currentUrl  == '/main/more') {
      this.editProfile = false;
    }
    else if(this.currentUrl == '/main/more/edit-profile'){
      this.editProfile = true;
    }
     
  }

  routeToEdit() {
    this.editProfile = true;
    this.route.navigate(['main/more/edit-profile']);
  }

  logout(){
    const dialogRef=this.dialog.open(LogoutComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'../.assets/images/report.svg',
        heading:'Are you sure you want to logout?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, Logout',
        cancel:'Cancel'
      }
    })
  }


  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.companyProfile = res.result[0];
      console.log(this.companyProfile)
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

  submit(){
  console.log(this.profileForm.value);
   this.service.put( this.profileForm.value,{},`${API_ROUTES.More.changepic}`).pipe().subscribe((res)=>{
    console.log(res)
  })

}
setData(){
  this.profileForm.patchValue({
    profile_pic:this.profileDetails.profileurl,
    profile_cover:this.profileDetails.profile_cover

  })

}
}
