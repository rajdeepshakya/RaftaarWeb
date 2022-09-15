import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  editData(data: any, it: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient,private toastr:ToastrService,private loader:NgxUiLoaderService) { }

  // postData(path: string, data: any): Observable<any> {
  //   return this.http.post(path, data).pipe(
  //     catchError(err => {
  //       console.log(err);
  //       return err;
  //     }),
  //     map(resp => {return of(resp)}),
  //   );
  // }

  post(payload: any, url: string,parameter:any): Observable<any> {
    this.loader.start();
    let params = new HttpParams()
    params = params.appendAll(parameter)
    return this.http.post<any>(url, payload,{params:params}).pipe(
      catchError(err => {
        console.log(err);
        // this.toastr.error(err.error.message)
        this.loader.stop();
        return throwError(err.error);
        

      }),
      map(resp => {
        this.loader.stop();
        return resp}),
    )
  }

  postWithQueryString(payload: any, url: string,parameter:any): Observable<any> {
    
    var data=url+"?post_comment_id="+payload;
    let params = new HttpParams()
    params = params.appendAll(parameter)
    return this.http.post<any>(url+"?post_comment_id="+payload, "",{params:params}).pipe(
      catchError(err => {
        console.log(err);
        this.loader.stop();
        return throwError(err.error);
      }),
      map(resp => {
        this.loader.stop();
        return resp}),
    )
  }
  put(payload: any,queryParams:any, url: string): Observable<any> {
    let params = new HttpParams()
    params = params.appendAll(queryParams)
    return this.http.put<any>(url, payload,{params: params}).pipe(
      catchError(err => {
        console.log(err);
        this.loader.stop();
        return throwError(err.error);
      }),
      map(resp => {
        this.loader.stop();
        return resp}),
    )
  }

  get(payload:any,url: any): Observable<any> {
    let params = new HttpParams()
    params = params.appendAll(payload)
    return this.http.get(url,{params: params}).pipe(
      catchError(err => {
        console.log(err);
        this.loader.stop();
        return throwError(err.error);
      }),
        map((response: any) => {
          this.loader.stop();
          return response;
        }),
       
      )    
  }

  delete(payload:any,url: any): Observable<any> {
    this.loader.start();
    let params = new HttpParams()
    params = params.appendAll(payload)
    return this.http.delete(url,{params: params}).pipe(
      catchError(err => {
        console.log(err);
        this.loader.stop();
        return throwError(err.error);
      }),
        map((response: any) => {
          this.loader.stop();
          return response;
        }),
       
      )    
  }
}
