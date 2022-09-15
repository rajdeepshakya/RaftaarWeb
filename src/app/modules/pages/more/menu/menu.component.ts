import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { LogoutComponent } from 'src/app/shared/dialogs/logout/logout.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  companyProfile:any;
  businessActivity: any = [];
  business: any;
  subcategory: any;
  activtity: any;
  subCategory:any =[];
  industry:any;
  industryServed:any =[];
  subActivity:any = [];
  editProfile: boolean;
  constructor( private service: ApiServicesService,private dialog :MatDialog,
     private router:Router,private commonService:CommonService) { }

  ngOnInit(): void {
    this.getProfile();

  }

  getProfile(){
    this.service.get({},`${API_ROUTES.More.moreDetails}`).pipe().subscribe((res)=>{
      this.companyProfile = res.result[0];
      this.business = res.result[1];
      this.subcategory=res.result[2];
      this.industry = res.result[3];
      this.activtity=res.result[4]
      console.log(this.companyProfile)
      this.settingData();
    })
  }

  settingData(){
    this.business.businessActivity.forEach((val:any)=> {if(val.title){this.businessActivity.push(val.title)}});
    this.businessActivity = this.businessActivity.join(", ");
    console.log(this.businessActivity);
    this.subcategory.CategoryL3.forEach((val:any)=> this.subCategory.push(val.title));
    this.subCategory = this.subCategory.join(", ");
    // this.industry.industriesServed.forEach((val:any)=> this.industryServed.push(val.title));
    // this.industryServed = this.industryServed.join(", ");
    this.activtity.subActivity.forEach((val:any)=> this.subActivity.push(val.title));
    this.subActivity = this.subActivity.join(", ");
  }

  routeToEdit() {
    this.editProfile = true;
    this.router.navigate(['main/more/edit-profile']);
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
  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.profile_pic = reader.result as string;
        // this.profileForm.patchValue({
        //   profile_pic: reader.result

        // });
      };
    }

  }

  goBack(){
    this.commonService.goBack();
  }
}
