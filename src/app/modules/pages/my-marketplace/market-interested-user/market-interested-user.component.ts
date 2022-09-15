import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-market-interested-user',
  templateUrl: './market-interested-user.component.html',
  styleUrls: ['./market-interested-user.component.scss']
})
export class MarketInterestedUserComponent implements OnInit {
  id: any;
  data: any;
  constructor(private activeRoute:ActivatedRoute,private service:ApiServicesService) {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.id = params?.['id'];
        })
   }

  ngOnInit(): void {
    this.interestedUser();
  }

  interestedUser(){
    let dataToPost = {
      req_id:this.id
    }
    this.service.get(dataToPost,API_ROUTES.MyRequirements.interestedUsers).pipe().subscribe((res=>{
      console.log(res);
      if (res.success) {
        this.data = res.result;
      }
      
    }))
  }

}
