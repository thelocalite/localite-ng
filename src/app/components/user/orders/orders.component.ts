import { Component, OnInit } from "@angular/core";

import { Order } from "../../../models/order";
import * as M from "../../../../assets/js/materialize.min";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  pastOrders: Order[] = [];
  ongoingOrders: Order[] = [];

  constructor() {}

  ngOnInit() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".tabs");
      var instance = M.Tabs.init(elems);
    });
  }
}
