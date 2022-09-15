import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.scss']
})
export class OtherListComponent implements OnInit {
  cards=[
    {
    heading:'other',
    min:'Jan 22, 2022 at 1:30 PM',
    para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
    like:'103 Likes',
    comment:'67 Comments',
    share:'105 Share',
    
  
  },
  ]
  otherList: any;
  constructor(private service:ApiServicesService,) { }

  ngOnInit(): void {
  }
  onUserList(){

    this.service.get({},`${API_ROUTES.MyRequirements.getAllRequirementList}`).pipe().subscribe((res)=>{
      this.otherList = res.result;
    })
  }
}
