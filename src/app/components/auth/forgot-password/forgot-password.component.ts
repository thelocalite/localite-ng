import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector   : "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls  : ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotEmail     = "";
  password        = "";
  confirmPassword = "";
  token           = null;
  updatedPassword = null;
  email           = false;
  nomail          = false;
  notMatching     = false;
  changedPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.token = window.location.pathname.split("/")[2];
    console.log("***************" + this.token);
  }

  forgotPassword() {
    this.email  = false;
    this.nomail = false;
    if (this.forgotEmail != "") {
      this.authService.forgotPassword(this.forgotEmail).subscribe(data => {
        if (data === true) {
          this.email  = true;
          this.nomail = false;
        } else {
          this.email  = false;
          this.nomail = true;
        }
      });
    }
  }

  updatePassword() {
    this.notMatching = false;

    if (this.token != "" && this.password != "") {
      if (this.password === this.confirmPassword) {
        // console.log(this.token);
        // console.log(this.password);
        this.authService
          .updatePassword(this.token, this.password)
          .subscribe(data => {
            console.log(data);
            if (data.msg === "success") {
              this.updatedPassword = true;
            }
          });
      } else {
        this.updatedPassword = false;
        this.notMatching     = true;
      }
    }
  }
}
