import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

// Fire Base
import { auth, database } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

import { Router } from "@angular/router";
import { User } from "./user.model";

interface AuthPayload {
  user: User;
  success: boolean;
  token: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = null;
  jwtToken = null;
  loggedIn = false;
  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  isLoggedIn() {
    let email = localStorage.getItem("email");
    return !(email === null);
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        let user: User;
        console.log("You have been successfully logged in!");
        console.log(result);
        console.log(result.user);
        console.log(result.user.email);

        console.log("IDTOKEN: ");
        result.user.getIdToken(true).then(idToken => {
          var observable = this.httpClient
            .post<AuthPayload>(environment.authurl + "/users/firebase-login", {
              idToken,
              email: result.user.email,
              name: result.user.displayName
            })
            .pipe(
              map(response => {
                return response;
              })
            );

          observable.subscribe(data => {
<<<<<<< HEAD
            console.log(data);
            this.loggedIn = true;
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", "" + data.user.id);
            this.router.navigateByUrl("/");
            this.user = data.user;
            this.jwtToken = data.token;
          });
        });
=======
           console.log(data);
           this.loggedIn = true;
           localStorage.setItem("email", data.user.email);
           localStorage.setItem("name", data.user.name);
           localStorage.setItem("token", data.token);
           localStorage.setItem("userId", "" + data.user.id);
           window.location.replace(window.location.origin);
           this.user = data.user;
           this.jwtToken = data.token;
           localStorage.setItem("photoURL", result.user.photoURL);
         });
        }))
>>>>>>> da7187091c74851c491b7f437197eb96c2dc0feb
      })
      .catch(error => {
        this.loggedIn = false;
        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("photoURL");
    this.router.navigateByUrl[('/')];
  }

  login(email, password) {
    return this.httpClient
      .post<any>(environment.authurl + "/users/authenticate", {
        password: password,
        email: email
      })
      .pipe(
        map(data => {
          console.log("***** Pipe-map received data *****");
          console.log(data);
          if (data.success === true) {
            this.loggedIn = true;
            this.user = data.user;
            this.jwtToken = data.token;
            localStorage.setItem("email", email);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
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

  changePassword(email, password) {
    return this.httpClient
      .post<any>(environment.authurl + "/users/change-password", {
        newPassword: password,
        email      : email
      })
      .pipe(
        map(data => {
          console.log("***** Pipe-map received data *****");
          console.log(data);
          // if (data.result) {
          //   console.log("*** Result ***" + data.result);
          //   return true;
          // } else {
          //   console.log("*** Error ***" + data.err);
          //   // this.loggedIn = false;
          //   return false;
          // }
        })
      );
  }
}
