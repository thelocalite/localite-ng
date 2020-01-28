import { Component, OnInit, HostListener } from "@angular/core";

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
  // Array of Orders
  orders: Order[] = [];

  currentWindowWidth: number;

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
    this.currentWindowWidth = window.innerWidth;
    this.isFetching = true;
    this.orderService.fetchOrders().subscribe(
      orders => {
        console.log(orders);
        this.orders = orders;
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
      var elems1 = document.querySelectorAll(".fixed-action-btn");
      var options = { hoverEnabled: true };
      var instances1 = M.FloatingActionButton.init(elems1, options);
    });
  }
  onCancel() {}

  onCanelProduct() {}

  onRecived() {}

  addVendorReview() {}

  addProductRating() {}

  addToCart() {}

  addProductToCart() {}

  handleError() {
    this.error = null;
    window.location.reload();
    // this.isFetching = false;
  }

  @HostListener("window:resize")
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }
}
