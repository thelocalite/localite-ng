import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface TestObj {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthTestService {

  constructor(private http: HttpClient) {

   }

  testAuth() {
    return this.http.get<TestObj>(environment.restAPIUrl + "/testauth");
  }
}
