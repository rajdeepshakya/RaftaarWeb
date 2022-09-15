import { Component, OnInit } from '@angular/core';
 import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-plasticmachine',
  templateUrl: './plasticmachine.component.html',
  styleUrls: ['./plasticmachine.component.scss']
})
export class PlasticmachineComponent implements OnInit {

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
  

  constructor() {
  
    
   }

  ngOnInit(): void {
  }

}
