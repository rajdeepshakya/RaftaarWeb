import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-choose-interest',
  templateUrl: './choose-interest.component.html',
  styleUrls: ['./choose-interest.component.scss']
})
export class ChooseInterestComponent implements OnInit {
  loginForm:any;
  interestName:any;
  interestArray:any;
  selectDummyUserId: any = []
  selectUserId: any = []
  submitted:boolean=false
  constructor(    private toastr: ToastrService,
    private dialog :MatDialog, private service: ApiServicesService, private router: Router, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      interest: [this.selectDummyUserId],
      
    });
    this.onGetInterest();

  }

  onGetInterest(){
    this.service.get({},`${API_ROUTES.Account.getInterest}`).pipe().subscribe((res)=>{
      this.interestName = res.result
    })
  }

  onVerify(post:any){
    this.submitted=true
    if (this.selectDummyUserId.length < 3) {
      this.toastr.error("minimum 3 interests select")
    } 
    else {
    this.service.post(post,`${API_ROUTES.Account.chooseInterest}`,{}).pipe().subscribe((res)=>{
      
        
          const dialogRef=this.dialog.open(PostPublishComponent,{
            maxHeight: '100vh',
            width:'465px',
            height:'400px',
            panelClass:'resetPassword',
            data: {
              img:'assets/images/Completed_check.svg',
              heading:'Your account created successfully',
              title:'Your account has been successfully created',
              image:'assets/images/logout_3.svg',
              btn:'Take me to home'
            }
          })
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/main/home'])
          });        
      
    })
  }
  }
  
  interest(){
  
   
  }
  
  selectUser(val: any) {
    if (this.selectDummyUserId.includes(val)) {
      this.selectDummyUserId.splice(this.selectDummyUserId.indexOf(val), 1)
      console.log(this.selectDummyUserId);
      // this.selectUserId.splice(this.selectUserId.findIndex((v: any) => v.id === val), 1)
    }
    else {
      this.selectDummyUserId.push(val)
      // this.selectUserId.push({ 'id': val, 'priority': false })
      console.log(this.selectDummyUserId)
    }
   
  }
  
}
