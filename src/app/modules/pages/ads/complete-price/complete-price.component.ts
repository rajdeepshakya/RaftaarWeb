import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-complete-price',
  templateUrl: './complete-price.component.html',
  styleUrls: ['./complete-price.component.scss']
})
export class CompletePriceComponent implements OnInit {
  cards=[
    {
    heading:'Lorem ipsum dolor sit amet',
    min:'Jan 22, 2022 at 1:30 PM',
    para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
    like:'103 Likes',
    comment:'67 Comments',
    share:'105 Share',

  },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
