import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector   : "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls  : ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild("form", { static: false }) form: NgForm;

  loginEmail  : string = localStorage.getItem("email");
  oldPassword : string;
  newPassword : string;
  cNewPassword: string;

  isChanging       = false;
  changeSuccessful = false;
  failedToChange   = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  changePassword() {
    this.changeSuccessful = false;
    console.log(this.loginEmail);
    console.log("NewPassword" + this.newPassword);
    console.log("cNewPassword" + this.cNewPassword);
    console.log(this.form);

    if (
      this.loginEmail   != "" &&
      this.newPassword  != "" &&
      this.cNewPassword != ""
    ) {
      if (this.newPassword === this.cNewPassword) {
        this.isChanging = true;
        this.authService
          .changePassword(this.loginEmail, this.newPassword)
          .subscribe(data => {
            console.log(data);
            // if (data === true) {
              this.isChanging       = false;
              this.changeSuccessful = true;
              setTimeout(() => {
                this.router.navigateByUrl("/profile");
              }, 3000);
            // } else {
            //   this.failedToChange   = true;
            //   this.isChanging       = false;
            //   this.changeSuccessful = false;
            //   // this.router.navigateByUrl("/");
            // }
          });
      } else {
        this.failedToChange   = true;
        this.isChanging       = false;
        this.changeSuccessful = false;
      }
    } else {
      this.failedToChange   = true;
      this.isChanging       = false;
      this.changeSuccessful = false;
    }
  }
}
