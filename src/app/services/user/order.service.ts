import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { map, tap, catchError, retry } from "rxjs/operators";

import { Order } from "../../models/order";
import { CartProduct } from "../../models/cartProducts";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  // Past orders
  private ordersURL: string =
    "https://my-json-server.typicode.com/10maycdac/json-server/orders";

  orders: Order[] = [];

  constructor(private http: HttpClient) {}
  // fetch orders from given url
  fetchOrders() {
    return this.http.get<Order[]>(this.ordersURL).pipe(
      retry(3),
      map((orders: Order[]) => {
        this.orders = orders;

        // Itrating throught each order
        this.orders.forEach((order: Order) => {
          let productsArray: CartProduct[] = order.products;
          order.orderDate = new Date(order.orderDate);
          order.totalPrice = 0;
          // calculating the total price of the order by itrating throught each product
          productsArray.forEach((product: CartProduct) => {
            order.totalPrice += product.price * product.quantity;
          });
        });
        this.orders.sort(function(order1, order2) {
          var date1 = order1.orderDate;
          var date2 = order2.orderDate;
          if (date1 < date2) {
            return 1;
          } else if (date1 > date2) {
            return -1;
          }
          return 0;
        });
        return this.orders;
      })
    );
  }
}
