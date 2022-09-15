import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  users=[
    {
      img:'../../.assets/images/user_1.svg',
      name:'Peter Parker',
      email:'felicia.reid@example.com',
      contact:'(405) 555-0128',
      designation:'Lead Manager'
    },
  ]
  interestName:any;
  user_id:any;
  constructor(private dialog:MatDialog,
    private service :ApiServicesService,
    private activeRoute: ActivatedRoute,
    private router:Router,
    private commonService:CommonService) { }
  openDeactivateUserModal(){
    const dialogRef = this.dialog.open(DeleteComponent, {
      maxHeight: '100vh',
      width:'465px',
      // panelClass:'user-detail',
      data: {
        img:'assets/images/Delete.png',
        heading:'Are you sure you want to delete this user?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Deactivate',
        cancel:'Cancel'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onUserDelete();
      }
    });
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) =>{
      this.user_id = params?.['user_id'];
      console.log(this.user_id)


    })

    this.onUserDetails();

    
  }

  onUserDetails(){
    this.service.get({user_id:this.user_id},`${API_ROUTES.More.userDetails}`).pipe().subscribe((res)=>{
      this.interestName = res.result;
      console.log(this.interestName)
    })
  }

  onUserDelete(){
    this.service.delete({user_id:this.user_id},`${API_ROUTES.More.userDelete}`).pipe().subscribe((res)=>{
      this.interestName = res.result;
      this.router.navigate(['main/more/settings']);
      
    })
  }

  goBack(){
    this.commonService.goBack();
  }

}
