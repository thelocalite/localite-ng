import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn = false;
  constructor() {}

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }

  login() {
    this.loggedIn = true;
  }
}
