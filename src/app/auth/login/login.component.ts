import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { SubjectserviceService } from 'src/app/services/subjectService/subjectservice.service';
import { ValidationsService } from '../../services/validators/validator';
import { DeviceUUID } from 'device-uuid';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from 'src/app/services/data.service';
import { SignInService } from 'src/app/services/sign-in.service';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  emailloginForm:any;
  submitted: boolean = false;
  countnumber: any = "";
  mobilelogin: boolean = true;
  emaillogin: boolean = false;
  loginExpToken: any;
  number:any;
  useremail: any;
  uuid = new DeviceUUID().get();
  deviceInfo = this.deviceService.getDeviceInfo();
  currentDate = new Date();
  hidePassword:boolean= true;
  password: any;
  show = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern= "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"


  constructor(private toastr:ToastrService,private subjectService:SubjectserviceService,private fb: UntypedFormBuilder, private storageService:LocalStorageProvider, public validators:ValidationsService,private service :ApiServicesService, private router:Router,
    private deviceService:DeviceDetectorService,private dataService:DataService,
    private sign:SignInService) { }

  ngOnInit(): void {
    this.password = 'password';
    this.emailloginForm = this.fb.group({
      username:['',[Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required]],
      device_token:sessionStorage.getItem('deviceToken'),
      device_id:sessionStorage.getItem('deviceId'),
      device_type:this.deviceInfo.deviceType

    });

    this.loginForm = this.fb.group({
      country_code: ['+91'],
      phone_no:[Number(''),[Validators.required, Validators.pattern(/[0-9]{10}/)]],

    });
    // this.onOtpSend(this.loginForm.value)

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
  get f() {
    return this.loginForm.controls;
  }
  // get f1(){
  //   return this.emailloginForm.controls;
  // }

  //Login with Email
  onSubmit(post:any) {
   
    if(this.emailloginForm.valid) {
      this.service.post(post,`${API_ROUTES.Account.login}`,{}).pipe().subscribe(response => {
        if(response.success_code==201){
          sessionStorage.setItem("currentUser", JSON.stringify(response.result));
          this.storageService.setItem('access_token',response.result.token);
          this.router.navigate(['/main/home'],{queryParams: {type: 2}})
        }
      })
    }else {
      this.submitted=true;
    }

   
  }

  //Login with phone number
  
  //Login with phone number
  
  onOtpSend(post:any){
    debugger
      // this.storageService.setItem('loginPhone',this.loginForm.value.phone_no)
      if(this.loginForm.valid) {
        this.service.post(post,`${API_ROUTES.Account.otpSendPhone}`,{}).subscribe((res)=>{
          this.loginExpToken =res.result.expToken;
          this.storageService.setItem('expToken',this.loginExpToken);
          console.log(res);
          // this.dataService.setData('otp',res.result.bypass_otp);
          this.dataService.setData('loginPhone',post['phone_no'])
          if(res.success){
            this.router.navigate(['/phone-otp'],{queryParams: {type: 2}})
          }
        },
        (error)=>{
          this.toastr.error(error)
          console.log(error);
          console.log(error.message);
        }
        )
      }
      else {
        this.submitted = true;
      }
    
    
    this.subjectService.setNewUserInfo({
      number: this.number,
      useremail:this.useremail
    });
  }
  
  onClickRoute(){
    this.router.navigate(['/forgot-password'])
  }
   
 loginwithmobile() {
    this.mobilelogin = !this.mobilelogin;
    this.emaillogin = !this.emaillogin
  }

  loginwithemail() {
    this.emaillogin = !this.emaillogin;
    this.mobilelogin = !this.mobilelogin;
    if(this.mobilelogin == true) {
      this.submitted = false;
    }
  }

  googleSignin(){
    this.sign.GoogleAuth(1,this.uuid + this.currentDate,this.uuid,this.deviceInfo.deviceType);
  }
}


