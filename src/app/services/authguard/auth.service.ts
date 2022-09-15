

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageProvider } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
      private Http:HttpClient,
      private storageService: LocalStorageProvider,
      private router: Router,
    ) { }

  login(body:Object): Observable<any> {
    return this.Http.post<any>(``,body).pipe(
      catchError(err => {
        console.log(err)
        // err.statusText? this.toastr.error(err.statusText): this.toastr.error(err.message);
        return err;
      }),
      map(resp => resp),
    );
  }
  get isLoggedIn() {
    let token = this.storageService.getItem('access_token');
    let cUser = this.storageService.getItem('CurrentUser')
    if (token != undefined && token != null && cUser != undefined && cUser != null) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }
  logout() {
    this.storageService.clearAll();
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}