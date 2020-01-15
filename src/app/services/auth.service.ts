import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn: boolean = false;
  constructor() {}

  public isLoggedIn() {
    return this.loggedIn;
  }

  public logout() {
    this.loggedIn = false;
  }

  public login() {
    this.loggedIn = true;
  }
}
