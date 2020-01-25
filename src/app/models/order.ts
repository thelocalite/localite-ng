import { CartProduct } from "./cartProducts";
export class Order {
  id: number;
  userId: string;
  orderDate: string;
  shippedTo?:string;
  products: CartProduct[];
  totalPrice: number;
  status?: string;

  calTotalPrice = function() {
    var i;
    for (i = 0; i < this.products.length; i++) {
      this.totalPrice += this.products[i].price;
    }
  };
}
