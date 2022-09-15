import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-interesteduser',
  templateUrl: './interesteduser.component.html',
  styleUrls: ['./interesteduser.component.scss']
})
export class InteresteduserComponent implements OnInit {
  users=[
    {

    },
    {
      
    }
  ]
  data: any;
  id: any;
  constructor(private service:ApiServicesService,private activeRoute:ActivatedRoute) { 
    this.activeRoute.queryParams.subscribe((params) =>{
      this.id = params?.['id'];
    })
  }

  ngOnInit(): void {
    this.interestedUsersList();
  }

  interestedUsersList(){
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
