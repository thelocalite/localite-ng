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
  private pastOrdersURL: string =
    "https://my-json-server.typicode.com/10maycdac/json-server/pastOrders";
  private ongoingOrdersURL: string =
    "https://my-json-server.typicode.com/10maycdac/json-server/ongoingOrders";
  private userURL: string =
    "https://my-json-server.typicode.com/10maycdac/json-server/users/";
  error = new Subject<string>();

  orders: Order[] = [];
  constructor(private http: HttpClient) {}

  fetchOrders(ordersURL: string) {
    return this.http.get<Order[]>(ordersURL).pipe(
      map((orders: Order[]) => {
        this.orders = orders;
        this.orders.forEach((order: Order) => {
          let productsArray: CartProduct[] = order.products;
          order.totalPrice = 0;
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

  // fetchUser(id: number) {
  //   this.http
  //     .get(this.userURL + id)
  //     .subscribe((user: { id: number; name: string }) => {
  //       this.userName = user.name;
  //     });
  //   console.log(this.userName);

  //   return this.userName;
  // }
}
