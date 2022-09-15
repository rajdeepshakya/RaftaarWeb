import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interested-user',
  templateUrl: './interested-user.component.html',
  styleUrls: ['./interested-user.component.scss']
})
export class InterestedUserComponent implements OnInit {
  interestedUser:any=[
    {
image:"assets/images/myreqperson.png",
name:"BMW",
date:"Jan 22, 2022 at 1:30 PM"

  },
  {
    image:"assets/images/myreqperson.png",
    name:"Audi",
    date:"Jan 23, 2022 at 1:30 PM"
    
      },
      {
        image:"assets/images/myreqperson.png",
        name:"Ferrari",
        date:"Jan 24, 2022 at 1:30 PM"
        
          }
];
  
  userName:any=['Iron Man','Spider Man']
  constructor() { }

  ngOnInit(): void {
  }

}
