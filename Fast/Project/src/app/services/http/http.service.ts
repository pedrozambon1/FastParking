import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post<T = any>(api: string, body: any = {}) {
    return this.http.post<T>('http://localhost:3000' + '/api/' + api, body);
  }
}
