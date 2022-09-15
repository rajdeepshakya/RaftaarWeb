import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-interest',
  templateUrl: './show-interest.component.html',
  styleUrls: ['./show-interest.component.scss']
})
export class ShowInterestComponent implements OnInit {
  cards=[
    {
    heading:'Unisense Digital Agency',
    min:'27 mins ago',
    para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
    like:'103 Likes',
    comment:'67 Comments',
    share:'105 Share',
    name:'Toni Legros',
    usercomment:'Laborum distinctio autem voluptate dignissimos ut quo',
    reply:'Reply',
    likes:'2 Likes',
    ago:'10s ago'
  
  },
]
  constructor() { }

  ngOnInit(): void {
  }

}
