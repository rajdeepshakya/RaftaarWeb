import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSource = new BehaviorSubject('default message');
  private profileSource = new BehaviorSubject('me');
  currentMessage = this.searchSource.asObservable();
  currentProfile = this.profileSource.asObservable();
  constructor() { }

  changeSearch(text: string) {
    this.searchSource.next(text);
  }

  changeProfile(data: any) {
    this.profileSource.next(data);
  }
}
