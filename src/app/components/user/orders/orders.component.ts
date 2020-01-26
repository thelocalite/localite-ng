import { Component, OnInit } from "@angular/core";

import { Order } from "../../../models/order";
import * as M from "../../../../assets/js/materialize.min";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OrderService } from "../../../services/order.service";
import { stringify } from "querystring";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  pastOrders: Order[] = [];
  ongoingOrders: Order[] = [];
  userName: string = "test";
  isFetching: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient, private orderService: OrderService) {}

  ngOnInit() {
    // this.fetchUser(101);
    this.isFetching = true;
    this.orderService.fetchPastOrders().subscribe(orders => {
      console.log(orders);
      this.pastOrders = orders;
      this.isFetching = false;
    });

    this.isFetching = true;
    this.orderService.fetchOngoingOrders().subscribe(orders => {
      console.log(orders);
      this.ongoingOrders = orders;
      this.isFetching = false;
    });

    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".tabs");
      var instance = M.Tabs.init(elems);
    });
  }

  fetchOrders() {
    this.http
      .get(
        "https://my-json-server.typicode.com/10maycdac/json-server/pastOrders"
      )
      .subscribe(orders => {
        console.log(orders);
        // this.ongoingOrders = orders;
      });
  }

  fetchUser(id: number) {
    this.http
      .get(
        "https://my-json-server.typicode.com/10maycdac/json-server/users/" + id
      )
      .subscribe((user: { id: number; name: string }) => {
        console.log(user);
        this.userName = user.name;
      });
  }
}
