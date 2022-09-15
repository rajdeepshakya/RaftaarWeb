import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { SubjectserviceService } from 'src/app/services/subjectService/subjectservice.service';
import { EditEmailComponent } from 'src/app/shared/dialogs/edit-email/edit-email.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-email-otp-varification',
  templateUrl: './email-otp-varification.component.html',
  styleUrls: ['./email-otp-varification.component.scss']
})
export class EmailOtpVarificationComponent implements OnInit {
  @ViewChild('otp') ngOtpInputRef:any;
  data1: any;
  data3: any = [];
  timeLeft: number = 11;
  interval: any;
  resenddata:boolean=false;
  loginForm: any;
  email: any;
  email_no: any;
  data2: any;
  otpForm: any;
  emailid: any;
  otp: any;
  inputOtp: any;
  timerOn:boolean = true;
  submitted1:boolean = false;
  checkVal: boolean = false;

  constructor(private subjectService:SubjectserviceService,private service:ApiServicesService,
    private router:Router, private fb: UntypedFormBuilder, private storageService:LocalStorageProvider,
    private dataService:DataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.email = this.dataService.getDataByKey('loginEmail');
    
   
    // this.email_no = this.storageService.getItem('phone');
    // this.email = this.email_no.email
    this.loginForm = this.fb.group({
      email:[this.email],
     

    });
    this.onOtpSend(1);

    this.otpForm = this.fb.group({
      email:[this.email],
      otp:[''],
      type:"verification"
    })
    this.subjectService.getNewUserInfo().subscribe(info => {
      this.emailid = info;
    })
  }

  onOtpSend(type:any){
    this.service.post(this.loginForm.value,`${API_ROUTES.Account.otpSendPhone}`,{}).pipe().subscribe((res)=>{
     this.data2 = res.result.expToken
      if(res.success_code==201){
        // this.otp= res.result.bypass_otp;
        if(type == 2){
          this.ngOtpInputRef.setValue("");
          this.timer(60)
        }
        // this.otpForm.patchValue({
        //   expToken:this.data1,
        // })
        //this.router.navigateByUrl('/email-otp')
      }
    })
    
  }

  onOtpChange(ev:any){
    console.log(ev);
    console.log(ev.length);
    this.inputOtp = ev
    console.log(this.otp);
    // this.submitted1=false;
    // this.checkVal = false;
  }



  onVerify(otpPost:any){
    //if(this.otp == parseInt(this.inputOtp)){
      otpPost['otp'] = this.inputOtp;
      if(this.inputOtp && this.inputOtp != "" && this.inputOtp.length == 6) {
        this.service.post(otpPost,`${API_ROUTES.Account.verifyOTP}`,{expToken:this.data2}).pipe().subscribe((res)=>{
          if(res.success_code==201){
            this.storageService.setItem('access_token',res.result.token);
              this.router.navigateByUrl('/choose-interest')
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

  editEmail(){
    const dialogRef = this.dialog.open(EditEmailComponent, {
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
        if(data.result == true){
          let Email = {
            email:data.data
          }
          this.service.post(Email,`${API_ROUTES.Account.editPhoneOrEmail}`,{}).subscribe((res)=>{
            if(res.success_code==200){
              this.email = data.data;
              this.loginForm.value['email'] = this.email;
              this.otpForm.value['email'] = this.email;
              this.storageService.setItem('access_token', res.result.token)
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
      

    })
  }

}
