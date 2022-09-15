import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  users=[
    {
      img:'../assets/images/user_1.svg',
      name:'Peter Parker',
      email:'felicia.reid@example.com',
      contact:'(405) 555-0128',
      designation:'Lead Manager'
    },
    {
      img:'../assets/images/user_1.svg',
      name:'Peter Parker',
      email:'felicia.reid@example.com',
      contact:'(405) 555-0128',
      designation:'Lead Manager'
    },
    {
      img:'../assets/images/user_1.svg',
      name:'Peter Parker',
      email:'felicia.reid@example.com',
      contact:'(405) 555-0128',
      designation:'Lead Manager'
    },
  ]
    constructor(private service:ApiServicesService, private storage:LocalStorageProvider, private router:Router,private commonService:CommonService) { }
    interestName:any =[];
    ngOnInit(): void {
      this.onUserList();
      
    }
    onUserList(){
      this.service.get({},`${API_ROUTES.More.userList}`).pipe().subscribe((res)=>{
        this.interestName = res.result;
      })
    }
    viewUser(data:any){
      this.router.navigate(['/main/more/userdetail'],{queryParams:{user_id:data}})
  
    }

    goBack(){
      this.commonService.goBack();
    }
  }