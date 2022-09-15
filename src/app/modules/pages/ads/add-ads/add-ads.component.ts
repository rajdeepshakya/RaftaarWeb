import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})
export class AddAdsComponent implements OnInit {
  loginForm: any;
  submitted: boolean = false;
 
  constructor(private dialog:MatDialog,private router :Router) { }

  ngOnInit(): void {
  }
  // Post(){
  //   const dialogRef = this.dialog.open(EditPopupComponent, {
  //     maxHeight: '100vh',
  //     width:'465px',
  //     panelClass:'yespost',
  //     data: {
  //       img:'assets/images/post_2.svg',
  //       heading:'Are you sure you want to post this ',
  //       para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
  //       report:'Back',
  //       cancel:'Yes, Post'
  //     }
  //   });
  // }
  addAds(){
    this.router.navigate(['main/profile/ads/complete-price'])
  }
}
