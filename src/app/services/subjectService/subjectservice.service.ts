import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectserviceService {
  constructor() { }

  private newUser = new BehaviorSubject<any>({
    comment: 'Kevin',
    number:'9393939393'
   
  });

  setNewUserInfo(user: any) {
    this.newUser.next(user);
  }

  getNewUserInfo() {
    return this.newUser.asObservable();
  }
}
