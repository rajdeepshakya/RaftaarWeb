import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-profile-create-post',
  templateUrl: './profile-create-post.component.html',
  styleUrls: ['./profile-create-post.component.scss']
})
export class ProfileCreatePostComponent implements OnInit {
  loginForm: any;
  submitted: boolean = false;
 
  constructor(private dialog:MatDialog, private fb :UntypedFormBuilder, private service :ApiServicesService, private router:Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      company_name: ['',[Validators.required]], 
      email:['',[Validators.required,Validators.email]],
      phone_no: ['',[Validators.required]],
      industry_id: ['',[Validators.required]],
      password:['',[Validators.required]],
      confirm_password:['',[Validators.required]],
      gst_no:[''],
      country_code:['+91'],
      device_token:sessionStorage.getItem('deviceToken'),
      device_id: sessionStorage.getItem('deviceId'),
      device_type:'web'


    });
  }
  openpostModal(){
   
  }
  postPublish(){
    const dialogRef = this.dialog.open(PostPublishComponent, {
      maxHeight: '100vh',
      width:'550px',
      data: {
        img:'../.assets/images/Completed_check.svg',
        heading:'Post Published',
        title:'Please check your inbox and click in the recieved link to reset a password',
        btn:'Okay'
      }
    });
  }
  onSubmit(post:any) {
    console.log(post,"signup")
    this.submitted = true;
    this.service.post(post,`${API_ROUTES.Post.createPost}`,{}).pipe().subscribe((res)=>{
      if(res.success){
         this.router.navigate(['/phone-otp'],{queryParams: {type: 1}})
        
      }
    })
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      data: {
        img:'assets/images/Icon.png',
        heading:'Are you sure you want to post this project?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Back',
        cancel:'Yes, Post'
      }
    });
  }

}
