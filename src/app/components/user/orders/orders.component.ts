import { Component, OnInit } from "@angular/core";

import { Order } from "../../../models/order";
import * as M from "../../../../assets/js/materialize.min";
import { HttpHeaders } from "@angular/common/http";
import { OrderService } from "../../../services/order.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  // Array of past Orders
  pastOrders: Order[] = [];

  // Array of ongoing Orders
  ongoingOrders: Order[] = [];

  // Flag to check if the get request is being executed
  isFetching = false;

  // Error Flag / Property
  error = null;

  // Http headers
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.isFetching = true;
    this.orderService.fetchPastOrders().subscribe(
      orders => {
        console.log(orders);
        this.pastOrders = orders;
        this.isFetching = false;
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );

    this.isFetching = true;
    this.orderService.fetchOngoingOrders().subscribe(
      orders => {
        console.log(orders);
        this.ongoingOrders = orders;
        this.isFetching = false;
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );

    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".tabs");
      var instance = M.Tabs.init(elems);
    });
  }
}
