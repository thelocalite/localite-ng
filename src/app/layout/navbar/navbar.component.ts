import { Component, OnInit } from "@angular/core";
import * as M from "../../../assets/js/materialize.min";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Sidenav Init
    const sidenav = document.querySelector(".sidenav");
    M.Sidenav.init(sidenav, {});
  }
}
