import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthService {
  user = null;
  jwtToken = null;
  loggedIn = false;
  constructor(private httpClient: HttpClient) {}

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }

  login(email, password) {
    return this.httpClient
        .post<any>(
            'http://localhost:9090/users/authenticate',
            {password: password, email: email})
        .pipe(map(data => {
          console.log(data);
          if (data.success === true) {
            this.loggedIn = true;
            this.user = data.user;
            this.jwtToken = data.token;
            return true;
          } else {
            this.loggedIn = false;
            return false;
          }
        }));
  }

  register(
      registerEmail: any, registerName: any, registerPassword: any,
      registerRole: any) {
    return this.httpClient
        .post<any>('http://localhost:9090/users/register', {
          role: registerRole,
          password: registerPassword,
          name: registerName,
          email: registerEmail
        })
        .pipe(map(data => {
          console.log(data);
          if (data.success === true) {
            return true;
          } else {
            return false;
          }
        }));
  }

  forgotPassword(forgotEmail: string) {
    return this.httpClient
        .post<any>(
            'http://localhost:9090/users/forgot-password', {email: forgotEmail})
        .pipe(map(data => {
          if (data.msg === 'sent an email') {
            return true;
          } else {
            return false;
          }
        }))
  }

  updatePassword(token: any, password: string) {
    return this.httpClient
        .get<any>('http://localhost:9090/users/token-signin/' + token)
        .pipe(map(data => {
          console.log(data);
        }));
  }
}
