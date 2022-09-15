import { Injectable, NgZone } from '@angular/core';
// import { auth } from 'firebase/app';
// import { Router } from "@angular/router";
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat';
import { GoogleAuthProvider } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiServicesService } from './apiServices/api-services.service';
import { API_ROUTES } from '../core/_constants/api-route.constant';
import { Router } from '@angular/router';
import { LocalStorageProvider } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  user: any;
  deviceId:any;
  deviceToken:any;
  deviceType:any;
  type:any;
    constructor(
        // public router: Router,
        // public ngZone: NgZone,
        // public afAuth: AngularFireAuth,
        // private angularFireAuth: AngularFireAuth,
        private storageService:LocalStorageProvider,
        private router:Router,
        private service:ApiServicesService,
        public afAuth: AngularFireAuth
    ) {
        // this.afAuth.authState.subscribe((user:any) => {
        //     this.user = user;
        // })
    }

  //   OAuthProvider(provider:any) {
  //     return this.afAuth.signInWithPopup(provider)
  //         .then((res:any) => {
  //             this.ngZone.run(() => {
  //                 this.router.navigate(['dashboard']);
  //             })
  //         }).catch((error:any) => {
  //             window.alert(error)
  //         })
  // }
  // // Firebase Google Sign-in
  // SigninWithGoogle() {
  //     return this.OAuthProvider(new firebase.auth.GoogleAuthProvider())
  //         .then((res:any) => {
  //             console.log('Successfully logged in!')
  //         }).catch((error:any) => {
  //             console.log(error)
  //         });
  // }
  // // Firebase Logout 
  // SignOut() {
  //     return this.afAuth.signOut().then(() => {
  //         this.router.navigate(['login']);
  //     })
  // }

  GoogleAuth(type:any,deviceToken:any,deviceId:any,deviceType:any) {
    this.type = type;
    this.deviceId = deviceId;
    this.deviceToken = deviceToken;
    this.deviceType = deviceType;
    return this.AuthLogin(new GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        if(this.type == 1){
          this.googleSignIn(result)
        }
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  googleSignIn(data:any){
    let post = {
      gid:  data.additionalUserInfo.profile.id ,
      company_name: data.additionalUserInfo.profile.name,
            email: data.additionalUserInfo.profile.email,
            device_token: this.deviceToken,
            device_id: this.deviceId,
            device_type: this.deviceType,
    }
    this.service.post(post, `${API_ROUTES.Account.socialLogin}`, {}).pipe().subscribe((res) => {
      // this.storageService.setItem('access_token', res.result.token)
      // this.storageService.setItem('phone', res.result)
      if (res.success) {
        this.storageService.setItem('access_token',res.result.token);
        this.storageService.setItem('UserId',res.result.id);
        this.router.navigateByUrl('/main/home');
        // this.dataService.setData('loginPhone',post['phone_no']);
        // this.dataService.setData('loginEmail',post['email']);
        // this.router.navigate(['/phone-otp'], { queryParams: { type: 1 } })

      }
      
    })
  }
}
