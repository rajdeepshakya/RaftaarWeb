import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChooseInterestComponent } from './choose-interest/choose-interest.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVarificationComponent } from './otp-varification/otp-varification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { RouteConstant } from '../core/_constants/route.constant';
import {EmailOtpVarificationComponent} from './email-otp-varification/email-otp-varification.component'
import {PhoneOtpVarificationComponent} from './phone-otp-varification/phone-otp-varification.component'
const routes: Routes = [
  {
path:'',
component:LoginComponent
},
{
path:RouteConstant.chooseInterest,
component:ChooseInterestComponent
},
{
  path:RouteConstant.forgotPassword,
  component:ForgotPasswordComponent
},
{
  path:RouteConstant.otpVarification,
  component:OtpVarificationComponent
},
{
  path:RouteConstant.resetPassword,
  component:ResetPasswordComponent
},
{
  path:RouteConstant.signup,
  component:SignupComponent
},
{
  path:'email-otp',
  component:EmailOtpVarificationComponent
},
{
  path:'phone-otp',
  component:PhoneOtpVarificationComponent
}





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
