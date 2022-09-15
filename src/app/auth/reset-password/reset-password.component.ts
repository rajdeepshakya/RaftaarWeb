import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { ValidationsService } from 'src/app/services/validators/validator';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { ConfirmPasswordValidator } from '../signup/confirm-password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  loginForm:any;
countnumber: any = "";
submitted:boolean=false;
wrongpassword:boolean=false;
  userToken: any;
  hidePassword :boolean = true;
  hideConfirmPassword :boolean = true;
  password:any
  show = false;
  confirmshow:boolean=false;
  confirmpassword:any;
  passwordPattern= "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"


  constructor(private fb:UntypedFormBuilder,public validators:ValidationsService,
    private router:Router, private dialog :MatDialog, private service :ApiServicesService, private storageService:LocalStorageProvider) { }

  ngOnInit(): void {
    this.password = 'password';
    this.confirmpassword='password'
    this.userToken = this.storageService.getItem('userToken')
    this.loginForm = this.fb.group({
      user_token:[this.userToken],
      new_password: ['', Validators.required,Validators.pattern(this.passwordPattern)],
      confirm_password: ['', Validators.required],

    },
    {
      validator: ConfirmPasswordValidator("new_password", "confirm_password")
    }
    );
    
  }

  onSubmit(post:any) {
    this.passwordMatch();
    this.submitted = true;
    if(this.loginForm.valid && this.wrongpassword == false){
      this.service.post(post,`${API_ROUTES.Account.resetPassword}`,{}).pipe().subscribe((res)=>{
        if(res.success_code==201){
          this.resetPassword();
        }
      })
    }
    
    
  }
  get f(){
    return this.loginForm.controls;
  }
  passwordMatch(){
    if(this.f.new_password.value!==this.f.confirm_password.value){
      this.wrongpassword = true;
    }
    else{
      this.wrongpassword=false;
      
    }
  }
  confirm(){
    if (this.confirmpassword === 'password') {
      this.confirmpassword = 'text';
      this.confirmshow = true;
    } else {
      this.confirmpassword = 'password';
      this.confirmshow = false;
    } 
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  input(){
    this.wrongpassword = false;
  }
resetPassword(){
    const dialogRef=this.dialog.open(PostPublishComponent,{
      maxHeight: '100vh',
      width:'465px',
      panelClass:'resetPassword',
      data: {
        img:'assets/images/Completed_check.svg',
        heading:'Password Reset Successfully',
        title:'Please check your inbox and click in the recieved link to reset a password',
        image:'assets/images/login.svg',
        btn:'Back to login'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/']);
    })
  }
  }

