import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouteConstant } from 'src/app/core/_constants/route.constant';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { AddNewComponent } from 'src/app/shared/dialogs/add-new/add-new.component';
import { AddpostComponent } from 'src/app/shared/dialogs/addpost/addpost.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-profile-front-page',
  templateUrl: './profile-front-page.component.html',
  styleUrls: ['./profile-front-page.component.scss']
})
export class ProfileFrontPageComponent implements OnInit {
  isShow=false
  itemsList=[
    {
      list:'About',
      pathModule: RouteConstant.about
    },
    {
      list:'Projects',
      pathModule: RouteConstant.projects
    },
    {
      list:'Featured Products',
      pathModule: RouteConstant.products
    },
    {
      list:'Instruments',
      pathModule: RouteConstant.instruments
    }   
  ]
  
  
  users=[
    {
      img:'.assets/images/save_2.svg',
      heading:'Saved Requirement',
      para:'Pellentesque vivamus nulla est, '
    },
    {
      img:'.assets/images/heart.svg',
      heading:'Interests',
      para:'Pellentesque vivamus nulla est'
    },
    {
      img:'.assets/images/setting-2.svg',
      heading:'Settings',
      para:'Pellentesque vivamus nulla est'
    },
    {
      img:'.assets/images/key.svg',
      heading:'Change Password',
      para:'Pellentesque vivamus nulla est'
    },
    {
      img:'.assets/images/vector_2.svg',
      heading:'Privacy Policy',
      para:'Pellentesque vivamus nulla est'
    },
    {
      img:'.assets/images/simcard-2.svg',
      heading:'Terms of Use',
      para:'Pellentesque vivamus nulla est'
    },
  ]
  myProfile:boolean=true;
  // activeItem: boolean = false;
  // selected: any;

  constructor(private dialog:MatDialog, private route: Router,private storageService:LocalStorageProvider) { }

  showdropdown(){
    this.isShow=!this.isShow
  }

  ngOnInit(): void {
    if(this.storageService.getItem("currentUser") == "other"){
      this.myProfile = false;
    }
    else {
      this.myProfile = true;
    }
    
  }
  
  logout(){
    const dialogRef=this.dialog.open(EditPopupComponent,{
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

  addNew(){
    const dialogRef = this.dialog.open(AddpostComponent,{
      maxHeight: '100vh',
        width:'501px',
        panelClass:'addNew',
        data: {}
    })
  }
}
