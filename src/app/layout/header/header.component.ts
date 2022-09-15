import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { SearchService } from 'src/app/services/search.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { DetailsComponent } from 'src/app/shared/dialogs/details/details.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showHeader:boolean = true;
  isShow=false
  obs:Subscription;
users=[
  {
    img:'.assets/images/profile-circle_1.svg',
    heading:'Profile',
    para:'Pellentesque vivamus nulla est, '
  },
  {
    img:'.assets/images/image_1.svg',
    heading:'My Post',
    para:'Pellentesque vivamus nulla est'
  },
  {
    img:'.assets/images/document-text_2.svg',
    heading:'My Requirement',
    para:'Pellentesque vivamus nulla est'
  },
  {
    img:'.assets/images/box_2.svg',
    heading:'My Marketplace Products',
    para:'Pellentesque vivamus nulla est'
  },
  {
    img:'.assets/images/tag-2.svg',
    heading:'Ads',
    para:'Pellentesque vivamus nulla est'
  },
]
currentProfile:any;
showprofile:boolean=true
subscription:Subscription
searchControl = new FormControl();
  constructor(private dialog:MatDialog,private router:Router,private commonService:CommonService,
    private searchService:SearchService,private storageService:LocalStorageProvider) { }
  showdropdown(){
    this.isShow=!this.isShow
  }

  ngOnInit(): void {
    // if(this.storageService.getItem("currentUser") == "other"){
    //   this.showHeader = false;
    // }
    // else {
    //   this.showHeader = true;
    // }
    this.subscription = this.searchService.currentProfile.subscribe(text => this.currentProfile = text
    );
    if(this.currentProfile == "other"){
      this.showHeader = false;
    }
    else {
      this.showHeader = true;
    }
    this.searchControl.valueChanges.
    pipe(
      debounceTime(1000)
    ).subscribe(val=> this.searchService.changeSearch(val)
    )
  }
  logout(){
    const dialogRef=this.dialog.open(EditPopupComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'assets/images/log_out.png',
        heading:'Are you sure you want to logout?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, Logout',
        cancel:'Cancel'
      }
    })
  }
  details(){
    const dialogRef = this.dialog.open(DetailsComponent, {
      maxHeight: '100vh',
      width:'309px',
      panelClass:'detail',
      data: {
        img:'../.assets/images/yespost.svg',
        heading:'Hey, do you really want to delete this product?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, delete',
        cancel:'Go back'
      }
    });
  }

  goBack(){
    this.commonService.goBack();
  }

  search(event:any){
    // console.log(event.target.value);
    // this.searchService.changeSearch(event.target.value);
    
  }

  // profile(){
  //   this.showprofile=false
  // }
}
