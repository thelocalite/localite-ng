import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService as AxAuthService } from "angularx-social-login";

import * as M from "../../../../assets/js/materialize.min";
import { AuthService } from "src/app/services/auth/auth.service";
import { SocialUser } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginEmail = "";
  loginPassword = "";

  faliedToLogin = false;

  registerEmail = "";
  registerPassword = "";
  registerName = "";
  registerConfirmPassword = "";
  registerRole = "";

  emptyOption = false;

  passwordsDontMatch = false;
  registeredSuccesfully = false;
  failedToRegister = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private axAuthService: AxAuthService
  ) {}

  ngOnInit() {
    document.addEventListener("DOMContentLoaded", function() {});
  }

  login() {
    this.registeredSuccesfully = false;
    console.log(this.loginEmail);
    console.log(this.loginPassword);

    if (this.loginEmail != "" && this.loginPassword != "") {
      this.authService
        .login(this.loginEmail, this.loginPassword)
        .subscribe(data => {
          if (data === true) {
            this.router.navigateByUrl("/");
          } else {
            this.faliedToLogin = true;
          }
        });
    }
  }

  register() {
    console.log(this.registerEmail);
    console.log(this.registerName);
    console.log(this.registerPassword);
    console.log(this.registerConfirmPassword);
    console.log(this.registerRole);

    this.passwordsDontMatch = false;

    if (
      this.registerEmail != "" &&
      this.registerName != "" &&
      this.registerPassword != "" &&
      this.registerRole != ""
    ) {
      if (this.registerConfirmPassword !== this.registerPassword) {
        this.passwordsDontMatch = true;
      } else {
        this.passwordsDontMatch = false;
        this.authService
          .register(
            this.registerEmail,
            this.registerName,
            this.registerPassword,
            this.registerRole
          )
          .subscribe(data => {
            this.passwordsDontMatch = false;
            if (data == true) {
              this.registeredSuccesfully = true;
            } else {
              this.registeredSuccesfully = false;
              this.failedToRegister = true;
            }
          });
      }
    }
  }

  googleLogin() {
    this.axAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(x => console.log(x));
  }

  facebookLogin() {
    this.axAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(x => console.log(x));
  }
}
