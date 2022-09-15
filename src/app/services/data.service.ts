import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject('123');
  	data:any = this.dataSource.asObservable();

  constructor() { }

  setData(key:any,value:any){
    this.data[key] = value  		
  }
  getDataByKey(key:any){
    return this.data[key];
  }
  getData(){
    return this.data;
}

// getUrl(){
//   return this.url;
//}
}
