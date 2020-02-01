import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, retry } from "rxjs/operators";

import * as M from "../../../../assets/js/materialize.min";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  @ViewChild("form", { static: false }) updateForm: NgForm;
  userId: number;
  userRole: string = "";
  name: string;
  userName: string = "";
  userEmail: string = "";
  userContact: string = "";
  userAddress: string = "";
  isfetching: boolean = null;
  isUpdating: boolean = null;
  fetchingerror: boolean = null;
  updatedSuccessfully = false;
  updateFailed = false;

  imageUrl: string;

  profileURL = environment.restAPIUrl + "/user/profile";
  // profileURL = "http://192.168.1.8:8080" + "/user/profile";
  updateProfileURL = environment.restAPIUrl + "/user/update-profile";
  // updateProfileURL = "http://192.168.1.8:8080" + "/user/update-profile";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isfetching = true;
    this.fetchProfile();
    this.imageUrl =
      localStorage.getItem("photoURL") !== null
        ? localStorage.getItem("photoURL")
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWfAnsnuvNwxkkK1gTTc6RE3sqbT607oDZuFntio48GpigPsAj";

    // this.userName =
    //   localStorage.getItem("name") !== null
    //     ? localStorage.getItem("name")
    //     : "Test Name";
    // this.userEmail =
    //   localStorage.getItem("email") !== null
    //     ? localStorage.getItem("email")
    //     : "test@test";

    // this.userRole = localStorage.getItem("userRole");
    // this.userRole = localStorage.getItem("userRole");
    // this.userRole = localStorage.getItem("userRole");
    // this.userRole = localStorage.getItem("userRole");

    document.addEventListener("DOMContentLoaded", function() {
      var elements = document.querySelectorAll(".datepicker");
      var instances = M.Datepicker.init(elements);
    });
    console.log(localStorage.getItem("user"));
  }

  onUpdate() {
    console.log(this.updateForm);
    this.updateProfile();
  }

  fetchProfile() {
    this.http.get<User>(this.profileURL).subscribe(
      (user: User) => {
        console.log(user);
        console.log(user.role);
        console.log(user.contactNumber);
        this.userId = user.id;
        this.userRole = user.role == "ROLE_USER" ? "Customer" : "Merchant";
        this.name = user.name;
        this.userName = user.username;
        this.userEmail = user.email;
        this.userContact = user.contactNumber;
        this.userAddress = user.address;
        this.isfetching = false;
      },
      error => {
        this.userRole = "Customer";
        this.userEmail = "Customer@localite";
        this.isfetching = false;
        this.fetchingerror = true;
        console.log(error);
      }
    );
  }
  // Update profile
  updateProfile() {
    this.isUpdating = true;
    this.http
      .post(this.updateProfileURL, {
        name: this.name,
        userContact: this.userContact
      })
      .subscribe(
        data => {
          this.updatedSuccessfully = true;
          console.log(data);
          this.isUpdating = false;
        },
        error => {
          this.updateFailed = true;
          this.isUpdating = false;
          console.log(error);
        }
      );
  }
}
