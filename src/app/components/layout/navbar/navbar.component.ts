import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";

import * as M from "../../../../assets/js/materialize.min";

@Component({
  selector   : "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls  : ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Sidenav Init
    const sidenav = document.querySelector(".sidenav");
    M.Sidenav.init(sidenav);

    document.addEventListener("DOMContentLoaded", function() {
      var elements = document.querySelectorAll(".dropdown-trigger");
      var options  = {
        coverTrigger: false,
        hover: true
      };
      var instances = M.Dropdown.init(elements, options);
    });
  }
}
