import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InterestedComponent } from 'src/app/shared/dialogs/interested/interested.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-product-sarva-yoga',
  templateUrl: './product-sarva-yoga.component.html',
  styleUrls: ['./product-sarva-yoga.component.scss']
})
export class ProductSarvaYogaComponent implements OnInit {

  slidesStore: any = [
    
    'assets/images/Rectangle150882.svg',
    'assets/images/Rectangle150882.svg',
    'assets/images/Rectangle150882.svg'
    
  ]
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },
      nav: false,
    }
  

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  
  requestSent(){
    const dialogRef=this.dialog.open(PostPublishComponent,{
      maxHeight:'100vh',
      width:'550px',
      panelClass:'payNow',
      data: {
        img:'../.assets/images/Completed_check.svg',
        heading:'Your request has been sent',
        btn:'Okay'
      }
    })
  }
}
