import { CartProduct } from "./cartProducts";
export class Order {
  id: number;
  userId: number;
  orderDate: string;
  shippedTo?: string;
  products: CartProduct[];
  totalPrice?: number;
  status?: string;

  // https://stackoverflow.com/questions/42899570/method-in-typescript-class-give-error-is-not-a-function
  // constructor(json: any) {
  //   this.id = json.orderId;
  //   this.userId = json.userId;
  //   this.orderDate = json.orderDate;
  //   this.shippedTo = json.shippedTo;
  //   this.products = json.products;
  //   this.calTotalPrice();
  //   // this.calTotalPrice1();
  //   this.status = json.status;
  // }

  constructor({
    orderId,
    userId,
    orderDate,
    shippedTo,
    products,
    status
  }: {
    orderId: number;
    userId: number;
    orderDate: string;
    shippedTo: string;
    products: CartProduct[];
    status: string;
  }) {
    this.id = orderId;
    this.userId = userId;
    this.orderDate = orderDate;
    this.shippedTo = shippedTo;
    this.products = products;
    this.calTotalPrice();
    // this.calTotalPrice1();
    this.status = status;
  }
  calTotalPrice() {
    let i;
    this.products.forEach((product: CartProduct) => {
      this.totalPrice += product.price;
    });
  }

  calTotalPrice1() {
    var i;
    let total = 0;
    for (i = 0; i < this.products.length; i++) {
      total += this.products[i].price;
    }
    return total;
  }
}
