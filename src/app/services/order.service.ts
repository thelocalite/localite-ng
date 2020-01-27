import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { map, tap, catchError, retry } from "rxjs/operators";

import { Order } from "../models/order";
import { CartProduct } from "../models/cartProducts";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  // Past orders
  private pastOrdersURL: string =
    "https://my-json-server.typicode.com/10maycdac/json-server/pastOrders";

  // Ongoing Orders
  private ongoingOrdersURL: string =
    "https://my-json-server.typicode.com/10maycdac/json-server/ongoingOrders";

  orders: Order[] = [];

  constructor(private http: HttpClient) {}
  // fetch orders from given url
  fetchOrders(ordersURL: string) {
    return this.http.get<Order[]>(ordersURL).pipe(
      retry(3),
      map((orders: Order[]) => {
        this.orders = orders;
        // Itrating throught each order
        this.orders.forEach((order: Order) => {
          let productsArray: CartProduct[] = order.products;

          order.totalPrice = 0;

          // calculating the total price of the order by itrating throught each product
          productsArray.forEach((product: CartProduct) => {
            order.totalPrice += product.price * product.quantity;
          });

          console.log();
        });
        return this.orders;
      })
    );
  }

  fetchPastOrders() {
    return this.fetchOrders(this.pastOrdersURL);
  }
  fetchOngoingOrders() {
    return this.fetchOrders(this.ongoingOrdersURL);
  }
}
