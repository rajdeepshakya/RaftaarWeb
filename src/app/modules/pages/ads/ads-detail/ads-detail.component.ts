import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-ads-detail',
  templateUrl: './ads-detail.component.html',
  styleUrls: ['./ads-detail.component.scss']
})
export class AdsDetailComponent implements OnInit {
  cards=[
    {
    heading:'We care about your health',
    min:'Jan 22, 2022 at 1:30 PM',
    para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
    like:'103 Likes',
    comment:'67 Comments',
    share:'105 Share',

  },
  ]
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
  constructor() { }

  ngOnInit(): void {
  }


}
