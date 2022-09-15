import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageProvider } from '../../../services/storage/storage.service';
import { AuthService } from '../../../services/authguard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private storageService: LocalStorageProvider) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let token = this.storageService.getItem('access_token');
    let cUser = this.storageService.getItem('CurrentUser');
    if (this.authService.isLoggedIn && token != undefined && token != null && cUser != undefined && cUser != null ) {
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }

}