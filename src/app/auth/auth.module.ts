import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from  'ng-otp-input';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { OtpVarificationComponent } from './otp-varification/otp-varification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChooseInterestComponent } from './choose-interest/choose-interest.component';
import { SignupComponent } from './signup/signup.component';
import { SideImgComponent } from './side-img/side-img.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LayoutModule } from '../layout/layout.module';
import { EmailOtpVarificationComponent } from './email-otp-varification/email-otp-varification.component';
import { PhoneOtpVarificationComponent } from './phone-otp-varification/phone-otp-varification.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider,
// } from 'angularx-social-login';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    LoginComponent,
    OtpVarificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChooseInterestComponent,
    SignupComponent,
    SideImgComponent,
    EmailOtpVarificationComponent,
    PhoneOtpVarificationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    LayoutModule,
    NgOtpInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    // SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  // providers: [
  //   {
  //     provide: 'SocialAuthServiceConfig',
  //     useValue: {
  //       autoLogin: false,
  //       providers: [
  //         {
  //           id: GoogleLoginProvider.PROVIDER_ID,
  //           provider: new GoogleLoginProvider(
  //             '608999845980-fgu1lp0ghf7kvbct0kmi1o1r84j8ijj2.apps.googleusercontent.com'
  //           )
  //         },
  //         {
  //           id: FacebookLoginProvider.PROVIDER_ID,
  //           provider: new FacebookLoginProvider('1393146251160836')
  //         }
  //       ],
  //       onError: (err) => {
  //         console.error(err);
  //       }
  //     } as SocialAuthServiceConfig,
  //   }
  // ],
})
export class AuthModule { }
