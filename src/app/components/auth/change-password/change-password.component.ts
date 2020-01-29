import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  cNewPassword: string;
  failedToChange = null;
  constructor() {}

  ngOnInit() {}

  changePassword() {}
}
