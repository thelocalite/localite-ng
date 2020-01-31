import { CartProduct } from "./cartProducts";
import { Product } from "./product";
export class Order {
  id         : number;
  userId     : number;
  vendorId   : number;
  orderDate  : Date;
  status    ?: string;
  shippedTo ?: string;
  totalPrice?: number;
  show      ?: boolean;
  products   : OrderProduct[];

  addOrderProduct(cartProduct: CartProduct) {
    this.vendorId = cartProduct.vendor.id;
    this.products.push(
      new OrderProduct(
        cartProduct.product.id,
        cartProduct.id,
        cartProduct.product.name,
        cartProduct.product.mrp,
        cartProduct.price,
        cartProduct.quantity,
        cartProduct.product.imageUrl
      )
    );
  }
}

export class OrderProduct {
  id           : number;
  cartProductId: number;
  name         : string;
  mrp          : number;
  vendorPrice  : number;
  quantity     : number;
  imgUrl       : string;

  constructor(
    id           : number,
    cartProductId: number,
    name         : string,
    mrp          : number,
    vendorPrice  : number,
    quantity     : number,
    imgUrl       : string
  ) {
    this.id            = id;
    this.cartProductId = cartProductId;
    this.name          = name;
    this.mrp           = mrp;
    this.vendorPrice   = vendorPrice;
    this.quantity      = quantity;
    this.imgUrl        = imgUrl;
  }
}
