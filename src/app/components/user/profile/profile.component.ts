import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";


import * as M from "../../../../assets/js/materialize.min";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  @ViewChild("form", { static: false }) updateForm: NgForm;
  userRole: string = "";
  userName: string = "";
  userEmail: string = "";
  userContact: string = "";
  userDOB: string = "";
  userAddress: string = "";
  updatedSuccessfully: boolean = false;
  updateFailed: boolean = false;

  constructor() {}

  ngOnInit() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".datepicker");
      var instances = M.Datepicker.init(elems);
    });
  }

  onUpdate() {
    console.log(this.updateForm);
  }
}
