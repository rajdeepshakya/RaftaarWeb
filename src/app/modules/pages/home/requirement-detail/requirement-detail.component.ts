import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requirement-detail',
  templateUrl: './requirement-detail.component.html',
  styleUrls: ['./requirement-detail.component.scss']
})
export class RequirementDetailComponent implements OnInit {
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
  
  },]
  constructor() { }

  ngOnInit(): void {
  }

}
