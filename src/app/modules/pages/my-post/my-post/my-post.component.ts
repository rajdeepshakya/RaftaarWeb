import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {
  cards=[
    {
    heading:'Lorem ipsum dolor sit amet,',
    min:'Jan 22, 2022 at 1:30 PM',
    para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
    like:'103 Likes',
    comment:'67 Comments',
    share:'105 Share',
    
  
  },
  ]
  data: any;
  constructor(private service :ApiServicesService) { }

  ngOnInit(): void {
    this.getPost();
  }
  getPost(){
    this.service.get({},`${API_ROUTES.Post.myPost}`).pipe().subscribe((res)=>{
      this.data = res.result.List;
      console.log(this.data)
    })
  }
}
