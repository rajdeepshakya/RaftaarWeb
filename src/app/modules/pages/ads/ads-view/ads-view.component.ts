import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads-view',
  templateUrl: './ads-view.component.html',
  styleUrls: ['./ads-view.component.scss']
})
export class AdsViewComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }
}
