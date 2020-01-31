import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import * as M from "../../../../assets/js/materialize.min";
import { AuthService } from "src/app/services/auth/auth.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("form", { static: false }) loginForm: NgForm;
  @ViewChild("rform", { static: false }) registrationForm: NgForm;
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

  // preloader flags
  loggingIn = false;
  registering = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}




  ngOnInit() {
    document.addEventListener("DOMContentLoaded", function() {});
  }

  FacebookLogin(){
    this.loggingIn = true;
    this.authService.FacebookAuth();
  }

  GoogleLogin(){
    this.loggingIn = true;
    this.authService.GoogleAuth();
  }

  login() {
    this.registeredSuccesfully = false;
    console.log(this.loginEmail);
    console.log(this.loginPassword);
    console.log(this.loginForm);

    this.loggingIn = true;

    if (this.loginEmail != "" && this.loginPassword != "") {
      this.authService
        .login(this.loginEmail, this.loginPassword)
        .subscribe(data => {
          if (data === true) {
            this.loggingIn = false;
            this.router.navigateByUrl("/");
          } else {
            this.faliedToLogin = true;
            this.loggingIn = false;
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
    console.log(this.registrationForm);

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
        this.registering = true;
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
              this.registering = false;

            } else {
              console.log(data);

              this.registeredSuccesfully = false;
              this.failedToRegister = true;
              this.registering = false;
            }
          });
      }
    }
  }
}
