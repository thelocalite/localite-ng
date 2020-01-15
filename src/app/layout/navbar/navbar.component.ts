import { Component, OnInit } from "@angular/core";
import * as M from "materialize-css/dist/js/materialize";
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
