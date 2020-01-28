import { CartProduct } from "./cartProducts";
export class Order {
  id         : string;
  vendorId   : number;
  userId     : number;
  orderDate  : Date;
  shippedTo? : string;
  products   : CartProduct[];
  totalPrice?: number;
  status?    : string;
  show?      : boolean;
}
