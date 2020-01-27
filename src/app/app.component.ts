import { Component } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "localite-ng";
  container = true;

  constructor(private router: Router){
    this.router.events.subscribe((ev)=>{
      if (ev instanceof NavigationEnd) {
        console.log("****************************************************");
        console.log(window.location.pathname.split("/")[1]);
        if(window.location.pathname.split("/")[1] === "orders"){
          this.container=false;
        }else{
          this.container=true;
        }
      }
    })
  }
}
