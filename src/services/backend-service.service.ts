import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  httpHeaders: HttpHeaders;
  private apiUrl = 'https://client.ensitebuilder.com/api';
  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const accessToken = window.localStorage.getItem('accessToken');
      this.httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
    } else {
      this.httpHeaders = new HttpHeaders(); // Provide a default header when no accessToken is found
    }
  }

  getMethod(endPoint: string): Observable<any> {
    return this.http.get(this.apiUrl + endPoint, { headers: this.httpHeaders });
  }
  postMethod(endPoint: string, body: any): Observable<any> {
    return this.http.post(this.apiUrl + endPoint, body, {
      headers: this.httpHeaders,
    });
  }
  putMethod(endPoint: string, body: any): Observable<any> {
    return this.http.put(this.apiUrl + endPoint, body, {
      headers: this.httpHeaders,
    });
  }
  deleteMethod(endPoint: string, body: any): Observable<any> {
    return this.http.delete(this.apiUrl + endPoint, {
      headers: this.httpHeaders,
    });
  }
}
