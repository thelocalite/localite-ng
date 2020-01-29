import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

// Fire Base
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({ providedIn: "root" })
export class AuthService {
  user = null;
  jwtToken = null;
  loggedIn = false;
  constructor(private httpClient: HttpClient, public afAuth: AngularFireAuth) {}

  isLoggedIn() {
    let email = sessionStorage.getItem("email");
    return !(email === null);
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

   // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log("You have been successfully logged in!");
    }).catch((error) => {
        console.log(error);
    })
  }

  logout() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
  }

  login(email, password) {
    return this.httpClient
      .post<any>(environment.authurl + "/users/authenticate", {
        password: password,
        email: email
      })
      .pipe(
        map(data => {
          console.log(data);
          if (data.success === true) {
            this.loggedIn = true;
            this.user = data.user;
            this.jwtToken = data.token;
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("name", data.user.name);
            sessionStorage.setItem("token", data.token);
            return true;
          } else {
            this.loggedIn = false;
            return false;
          }
        })
      );
  }

  register(
    registerEmail: any,
    registerName: any,
    registerPassword: any,
    registerRole: any
  ) {
    return this.httpClient
      .post<any>(environment.authurl + "/users/register", {
        role: registerRole,
        password: registerPassword,
        name: registerName,
        email: registerEmail
      })
      .pipe(
        map(data => {
          console.log(data);
          if (data.success === true) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  forgotPassword(forgotEmail: string) {
    return this.httpClient
      .post<any>(environment.authurl + "/users/forgot-password", {
        email: forgotEmail
      })
      .pipe(
        map(data => {
          if (data.msg === "sent an email") {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  updatePassword(token: any, password: string) {
    console.log(token);
    console.log(password);

    return this.httpClient.post<any>(
      environment.authurl + "/users/token-signin/" + token,
      { password: password }
    );
  }
}
