import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { AppConst } from 'src/app/core/_constants/app.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { ValidationsService } from 'src/app/services/validators/validator';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import {DeviceUUID} from 'device-uuid';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from 'src/app/services/data.service';
// import { SocialAuthService } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SignInService } from 'src/app/services/sign-in.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('select') private select: MatSelect;
  loginForm: any;
  submitted: boolean = false;
  countnumber: any = "";
  data: any;
  business_activity :any=[];
  docList = [];
  test :any;
  categories: any;
  hidePassword :boolean = true;
  hideConfirmPassword :boolean = true;
  uuid = new DeviceUUID().get();
  deviceInfo = this.deviceService.getDeviceInfo();
  currentDate = new Date();
  password:any
  show = false;
  confirmshow:boolean=false;
  confirmpassword:any
  constructor(private fb: UntypedFormBuilder, public validators: ValidationsService,
    private service: ApiServicesService,
    private router: Router,
    private storageService: LocalStorageProvider,
    private dialog: MatDialog,
    private deviceService:DeviceDetectorService,
    private dataService:DataService,
    private toastr:ToastrService,

    // private authService:SocialAuthService,
    private sign:SignInService) { }

    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    passwordPattern= "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"
  ngOnInit(): void {
    this.password = 'password';
    this.confirmpassword='password'
    this.getIndustry();
    this.loginForm = this.fb.group({
      company_name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      phone_no: ['', [Validators.required]],
      category1_id: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.pattern(this.passwordPattern)]],
      confirm_password: ['', [Validators.required]],
      country_code: ['+91'],
      device_token:sessionStorage.getItem('deviceToken'),
      device_id:sessionStorage.getItem('deviceId'),
      device_type:this.deviceInfo.deviceType,
      business_activity: [[], [Validators.required]],
    },
    {
      validator: ConfirmPasswordValidator("password", "confirm_password")
    }
  );
    console.log(this.loginForm.value)
   
    // this.loginForm.valueChanges.subscribe(() => {
    //   this.select.close();
    // });
  }
  
  get f() {
    return this.loginForm.controls;

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
  onSubmit(post: any) {
    this.submitted = true;
    if(this.loginForm.valid){
      let businessActivity = [];
    console.log(post, "signup")
    for(let i =0; i<this.business_activity.length;i++){
      let obj = {
        title: this.business_activity[i].industry_name,
        business_activity: this.business_activity[i].id
      }
      businessActivity.push(obj)
    }
    
    post.business_activity=businessActivity;
    
    var dd=JSON.stringify(post);
    this.service.post(post, `${API_ROUTES.Account.signup}`, {}).pipe().subscribe((res) => {
      this.storageService.setItem('access_token', res.result.token)
      this.storageService.setItem('phone', res.result)
      if (res.success) {
        this.dataService.setData('loginPhone',post['phone_no']);
        this.dataService.setData('loginEmail',post['email']);
        this.router.navigate(['/phone-otp'], { queryParams: { type: 1 } })

      }
      
    },(error)=>{
      this.toastr.error(error.message)
      console.log(error);
      console.log(error.message);
    })
    }
    
    

  }
  getIndustry() {
    this.service.get({}, `${API_ROUTES.Account.getIndustry}`).pipe().subscribe((res) => {
      this.data = res.result;
      console.log(this.data)
    })
  }
  getCategory(id:any) {
    let catagory = {
      industry_id: id
    }
    this.service.get(catagory, `${API_ROUTES.Account.getCategory}`).pipe().subscribe((res) => {
      if(res.result.rows.length > 1){
        this.categories = [...res.result.rows];
      }
      
      console.log(this.categories)
    })
  }

  registered() {
    const dialogRef = this.dialog.open(PostPublishComponent, {
      maxHeight: '100vh',
      width: '465px',
      panelClass: 'resetPassword',
      data: {
        img: '../.assets/images/Completed_check.svg',
        heading: 'This comapany is already registered.',
        title: 'Please check your inbox and click in the recieved link to reset a password',
        image: '../.assets/images/logout_2.svg',
        btn: 'Back to login'
      }
    })
  }
  fix(event: any) {
    // let findFlag;
    if(event.value.length == this.data.length){
      this.select.close();
    }
    this.docList = [];
    event.value.forEach((val:any)=>{
      if(val.id!=null){
        let obj = this.business_activity.find((item:any) =>
          item.industry_name == val.industry_name
        );
          if (obj) {
            // findFlag = true;
          } else {
            // findFlag = false;
            this.business_activity.push(val);
            this.getCategory(val.id);

          }
      }
    });

    console.log(this.business_activity);
  }
  fixCategory(id: any) {
    console.log(id.target.value);

    this.loginForm.value.category1_id = id;

  }

  googleSignin(){
    this.sign.GoogleAuth(1,this.uuid + this.currentDate,this.uuid,this.deviceInfo.deviceType);
  }

  facebookSignIn(){
    // this.sign.FacebookAuth(2,this.uuid + this.currentDate,this.uuid,this.deviceInfo.deviceType);
    this.sign.FacebookAuth();
  }

}



