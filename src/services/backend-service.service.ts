import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
   httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`
});
  private apiUrl = 'https://client.ensitebuilder.com/api';
  constructor(private http: HttpClient) { }
  getMethod(endPoint:string): Observable<any> {
    return this.http.get(this.apiUrl+endPoint,{headers:this.httpHeaders});
  }
  postMethod(endPoint:string,body:any): Observable<any> {
    return this.http.post(this.apiUrl+endPoint,body,{headers:this.httpHeaders});
  }
  putMethod(endPoint:string,body:any): Observable<any> {
    return this.http.put(this.apiUrl+endPoint,body,{headers:this.httpHeaders});
  }
  deleteMethod(endPoint:string,body:any): Observable<any> {
    return this.http.delete(this.apiUrl+endPoint,{headers:this.httpHeaders});
  }
}
