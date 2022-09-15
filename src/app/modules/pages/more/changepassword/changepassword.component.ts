import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  submitted: boolean = false;
  loginForm: any;

  constructor( private service:ApiServicesService, private fb :UntypedFormBuilder,private commonService:CommonService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      old_password: ['',[Validators.required]], 
      new_password:['',[Validators.required,Validators.email]],
      confirm_password: ['',[Validators.required]],
      });
  }

  onSubmit(post:any) {
    console.log(post,"signup")
    this.submitted = true;
    this.service.post(post,`${API_ROUTES.More.changePassword}`,{}).pipe().subscribe((res)=>{
      if(res.success_code==200){
        alert(res.message)
        
      }
    })
    
  }

  goBack(){
    this.commonService.goBack();
  }
  get f() { return this.loginForm.controls; }

}
