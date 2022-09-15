import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { ValidationsService } from 'src/app/services/validators/validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
loginForm:any;
countnumber: any = "";
submitted:boolean = false;
number:any;
  constructor(private fb: UntypedFormBuilder, public validators:ValidationsService,
    private service :ApiServicesService, private router:Router, private storageService:LocalStorageProvider,
    private dataService:DataService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      country_code: ['+91'],
      phone_no:[Number(''),Validators.required],

    });
  }

  onOtpSend(post:any){
    this.submitted = true;
    if(this.loginForm.valid){
      this.submitted = false;
      this.service.post(post,`${API_ROUTES.Account.otpSendPhone}`,{}).pipe().subscribe((res)=>{
        if(res.success_code==201){
          this.storageService.setItem('forgotPhone',this.loginForm.value.phone_no)
          this.storageService.setItem('forgotExpToken',res.result.expToken)
          this.dataService.setData('loginPhone',post['phone_no']);
          this.dataService.setData('otp',res.result.bypass_otp);
          this.router.navigate(['/phone-otp'],{queryParams: {type: 3}})
        }
      })
    }
    
    
  }
  }

