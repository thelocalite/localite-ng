import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import * as M from "../../../../assets/js/materialize.min";

@Component({
  selector   : "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls  : ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  @ViewChild("form", { static: false }) updateForm: NgForm;

  userRole: string  = "";
  userName: string  = "";
  userEmail: string  = "";
  userContact: string  = "";
  userDOB: string  = "";
  userAddress: string  = "";
  updatedSuccessfully = false;
  updateFailed = false;

  profileURL: string;


  constructor() {}

  ngOnInit() {

    this.profileURL = (localStorage.getItem("photoURL") !== null ? localStorage.getItem("photoURL") : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWfAnsnuvNwxkkK1gTTc6RE3sqbT607oDZuFntio48GpigPsAj")

    document.addEventListener("DOMContentLoaded", function() {
      var elements  = document.querySelectorAll(".datepicker");
      var instances = M.Datepicker.init(elements);

      this.userName  = localStorage.getItem("name");
      this.userEmail = localStorage.getItem("email");

      // this.userRole = localStorage.getItem("userRole");
      // this.userRole = localStorage.getItem("userRole");
      // this.userRole = localStorage.getItem("userRole");
      // this.userRole = localStorage.getItem("userRole");
    });
    console.log(localStorage.getItem("user"));
  }

  onUpdate() {
    console.log(this.updateForm);
  }
}
