import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { SubjectserviceService } from 'src/app/services/subjectService/subjectservice.service';
import { ValidationsService } from 'src/app/services/validators/validator';
import { DeviceUUID } from 'device-uuid';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from 'src/app/services/data.service';
import { EditMobileComponent } from 'src/app/shared/dialogs/edit-mobile/edit-mobile.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phone-otp-varification',
  templateUrl: './phone-otp-varification.component.html',
  styleUrls: ['./phone-otp-varification.component.scss']
})
export class PhoneOtpVarificationComponent implements OnInit {
  @ViewChild('otp') ngOtpInputRef:any;
  otpForm:any;
  loginForm: any;
  data1: any;
  data3: any;
  timeLeft: number = 11;
  interval: any;
  resenddata:boolean=false;
  phone_no: any;
  phone: any;
  type: number=1;
  loginExpToken: any;
  loginOTpverify: any;
  loginContact: any;
  forgotExpToken: any;
  forgotContact: any;
  phoneNumber: any;
  uuid = new DeviceUUID().get();
  deviceInfo = this.deviceService.getDeviceInfo();
  currentDate = new Date();
  otp: any;
  inputOtp: any;
  timerOn :boolean = true;
  submitted:boolean=false
  submitted1:boolean = false;
  checkVal: boolean = false;

  constructor(private fb: UntypedFormBuilder, public validators:ValidationsService,
     private service:ApiServicesService,private router: Router,
      private storageService:LocalStorageProvider,private subjectService:SubjectserviceService, private activeRoute: ActivatedRoute,
      private deviceService:DeviceDetectorService,private dataService:DataService,
      public dialog: MatDialog, private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.loginContact = this.dataService.getDataByKey('loginPhone');
    console.log(this.loginContact);

    // this.otp = this.dataService.getDataByKey('otp');
    this.subjectService.getNewUserInfo().subscribe(info => {
      this.phoneNumber = info;
    })
    this.forgotContact = this.storageService.getItem('forgotPhone');
    console.log(this.forgotContact)
    // this.loginContact = this.storageService.getItem('loginPhone');
     this.phone_no = this.storageService.getItem('phone');
    this.phone = this.phone_no?.phone_no
    this.phone = Number(this.phone)
    this.type =  Number(this.activeRoute.snapshot.queryParams.type)
    this.loginForm = this.fb.group({
      country_code: ['+91'],
      phone_no:[this.loginContact],

    });
    

    this.otpForm = this.fb.group({
      country_code: ['+91'],
      phone_no:[this.loginContact],
      otp:['',[Validators.required]],
      type:"verification"
    })
     

    this.activeRoute.queryParams.subscribe((params) => {
     
      
      this.type = params?.['type'];
      console.log(this.type)
    });
         if(this.type==1){
         this.onOtpSend(this.loginForm.value,1)
        }else if(this.type==2){
          this.deviceInfo = this.deviceService.getDeviceInfo();
          this.otpForm=this.fb.group({
         
           country_code: ["+91"],
           phone_no: [Number(this.loginContact)],
           otp: [''],
           type: "login",
           device_token: sessionStorage.getItem('deviceToken'),
            device_id: sessionStorage.getItem('deviceId'),
           device_type: this.deviceInfo.deviceType
       
       })
     }else if(this.type==3){
      this.otpForm=this.fb.group({
      country_code: ["+91"],
       phone_no: [Number(this.loginContact)],
       otp: ['']
   
   })
   
 }
 else{
   console.log('route')
 }
  } 

  onOtpChange(ev:any){
    console.log("ccc"+ev);
    console.log(ev.length);
    this.inputOtp = ev
    console.log(this.otp);
    // this.submitted1=false;
    // this.checkVal = false;
    if(this.inputOtp.length < 6) {
      this.submitted1 = false;
    }
  }
   
    onOtpSend(post:any,type:any){
      this.submitted=true
        this.service.post(post,`${API_ROUTES.Account.otpSendPhone}`,{}).pipe().subscribe((res)=>{
          this.data1 = res.result.expToken;
          console.log(this.data1)
          if(res.success_code==201){
            this.storageService.setItem('UserId',res.id);
            // this.otp= res.result.bypass_otp;
            if(type == 2){
              this.ngOtpInputRef.setValue("");
              this.timer(60);
            }
            // this.otpForm.patchValue({
            //   expToken:this.data1,
            // })
            //this.router.navigateByUrl('/email-otp')
          }
        })
      
      
      
    }

    onOtpVerify(otpPost:any){
      this.submitted=true
      //if(this.otp == parseInt(this.inputOtp)){
      if(this.inputOtp && this.inputOtp != "" && this.inputOtp.length == 6)  {
        otpPost['otp'] =  this.inputOtp;
        this.service.post(otpPost,`${API_ROUTES.Account.verifyOTP}`,{expToken:this.data1}).subscribe((res)=>{
          if(res.success_code==201){
          this.router.navigateByUrl('/email-otp')
          }
        },(error)=>{
          console.log(error);
          this.submitted1=true;
          this.checkVal = false;
          
        })
      }
      else if(this.inputOtp && this.inputOtp != "" && this.inputOtp.length < 6) {
        this.submitted1=true;
        this.checkVal = false;
      }else if(!this.inputOtp) {
        this.checkVal = true;
        this.submitted1 = false;
      }

    //}

    }

    onLoginOtpVerify(loginPost:any){

      console.log("ppppppppppppppp",loginPost);
      //if(this.otp == parseInt(this.inputOtp) || parseInt(this.inputOtp) == 777777){
      loginPost['otp'] = this.inputOtp
      
      this.loginExpToken= this.storageService.getItem('expToken');
      if(this.inputOtp && this.inputOtp != "" && this.inputOtp.length == 6) {
        this.service.post(loginPost,`${API_ROUTES.Account.loginOtp}`,{expToken:this.loginExpToken}).subscribe((res)=>{
          if(res.success_code==201){
            console.log(res);
            
            sessionStorage.setItem("currentUser", JSON.stringify(res));
            this.storageService.setItem('access_token',res.result.token);
            this.storageService.setItem('UserId',res.result.id);
            this.router.navigateByUrl('/main/home');
          }
        },(error)=>{
          console.log(error);
          this.submitted1=true;
          this.checkVal = false;
          
        })
      }
      else if(this.inputOtp && this.inputOtp != "" && this.inputOtp.length < 6) {
        this.submitted1=true;
        this.checkVal = false;
      }else if(!this.inputOtp) {
        this.checkVal = true;
        this.submitted1 = false;
      }
     
    }
     
    
   

    onForgotPasswordVerfiy(forgotPost:any){
      // if(this.otp == parseInt(this.inputOtp)){
        this.submitted = false;
        forgotPost['otp'] = this.inputOtp
        console.log(forgotPost,this.forgotContact);
      this.forgotExpToken= this.storageService.getItem('forgotExpToken');
      this.service.post(forgotPost,`${API_ROUTES.Account.forgotPasword}`,{expToken:this.forgotExpToken}).subscribe((res)=>{
        if(res.success_code==201){
          this.storageService.setItem('userToken',res.result.userToken)
          this.router.navigateByUrl('/reset-password')
        }else if(this.inputOtp && this.otp != parseInt(this.inputOtp)) {
          this.submitted1=true;
          this.checkVal = false;
        }else if(!this.inputOtp) {
          this.checkVal = true;
          this.submitted1 = false;
        }
      })
      // }
      
      
    }

    editPhone(){
      if(this.type != 1) {
        this.router.navigate(['/']);
      }
      else {
        const dialogRef = this.dialog.open(EditMobileComponent, {
          maxHeight: '100vh',
          width: '465px',
          panelClass: 'yespost',
          data: {
            img: 'assets/images/addpost.png',
            heading: 'Are you sure you want to save this Manufacturing Order Requirement?',
            report: 'Back',
            cancel: 'Yes, Save'
          }
        });
        dialogRef.afterClosed().subscribe(data => {
          console.log('The dialog was closed', data);
          if(this.type == 1){
            if(data.result == true){
              let Phone = {
                country_code:"+91",
                phone_no: data.data
              }
              this.service.post(Phone,`${API_ROUTES.Account.editPhoneOrEmail}`,{}).subscribe((res)=>{
                if(res.success_code==200){
                  this.loginContact = data.data;
                  this.storageService.setItem('access_token', res.result.token)
                  this.loginForm.value['phone_no'] = this.loginContact;
                  this.otpForm.value['phone_no'] = this.loginContact;
                  this.service.post(this.loginForm.value,`${API_ROUTES.Account.otpSendPhone}`,{}).pipe().subscribe((res)=>{
                    this.data1 = res.result.expToken;
                    console.log(this.data1)
                    if(res.success_code==201){
                      this.storageService.setItem('UserId',res.id);
                      // this.otp= res.result.bypass_otp;
                      // this.otpForm.patchValue({
                      //   expToken:this.data1,
                      // })
                      //this.router.navigateByUrl('/email-otp')
                    }
                  })
                //  this.router.navigateByUrl('/email-otp');
         
                 }
                })
            }
          }
          
          
  
        })
      }
      
    }
  

// timer(){
//   this.interval = setInterval(() => {
//     if ( this.timeLeft>=1) {
//       this.resenddata=true;
//       this.timeLeft--;
//       //console.log(this.timeLeft)
//       this.data3=this.timeLeft
//     } 
//     else if(this.timeLeft==0){
//       this.resenddata=false
//       this.data3 = [];
//     }
//   }, 1000)
// }

timer(time:any) {
  let min:any = Math.floor(time / 60);
  let sec:any = time % 60;
  
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  // document.getElementById('timer').innerHTML = m + ':' + s;
  this.data3 = min + ':' + sec;
  time -= 1;
  
  if(time >= 0 && this.timerOn) {
    this.resenddata = true;
    setTimeout(x => {
      this.timer(time)
    }, 1000);
    return;
  }
  else {
    this.data3 = "";
    this.resenddata = false;
  }

  if(!this.timerOn) {
    // Do validate stuff here
    return;
  }
  
  // Do timeout stuff here
  // alert('Timeout for otp');
}

}
