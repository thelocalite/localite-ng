import { Component, OnInit } from "@angular/core";
import { CartProduct } from "src/app/models/cartProducts";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[];

  //Sub-Total of the cart products
  subTotal: number = 0;

  //Products saved to the 'save for later' list, and removed from the cart
  savedProducts: CartProduct[];

  //Flag to denote whether saved items are there or not
  savedItemsFlag: boolean = false;

  //Current Product being worked on
  product: CartProduct;

 

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCartProducts()
    .subscribe(cartProducts => {this.cartProducts = cartProducts
      this.cartProducts.forEach(cartProduct => {
        this.subTotal = this.subTotal + cartProduct.price;
      });
      console.log(cartProducts);
    });
    

    this.userService.getSavedProducts()
    .subscribe(savedProducts => {this.savedProducts = savedProducts
      console.log(savedProducts);
    });

  }

  getSubTotal(): number {

      return this.subTotal;
  }


  //----------------'Shopping Cart' methods-----------

  //----------On deleting product from Cart---------
  onDeleteFromCart(cartProduct) {
    console.log("Entered onDeleteFromCart");
    this.product = cartProduct;
    this.subTotal = this.subTotal - this.product.price;

    //Remove the Product From CartProducts
    const index: number = this.cartProducts.indexOf(this.product);
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
    }

    this.userService.deleteFromCart(cartProduct.id).subscribe();
  }

  //----------On Saving to 'save for later' and deleting product from Cart---------
  onSaveForLater(cartProduct) {
    console.log("Entered onSaveForLater");
    console.log(this.savedProducts);

    //set the flag as true so that 'Saved For Later' Items block can be visible
    this.savedItemsFlag = true;

    //reduce the Sub-Total for Cart
    this.product = cartProduct;

    //Add The product to savedProducts
    this.savedProducts.push(this.product);
    this.userService.updateSaved(this.product).subscribe();

    //Delete the Product from CartProducts
    this.onDeleteFromCart(this.product);
  }

  // ---------------'Saved Items' methods----------

  //----------On deleting product from 'Save for later' list-----------
  onDeleteFromSavedItems(savedProduct) {
    console.log("Entered onDeleteFromSavedItems");
    this.product = savedProduct;
    const index: number = this.savedProducts.indexOf(this.product);
    if (index !== -1) {
      this.savedProducts.splice(index, 1);
    }

    if (this.savedProducts.length == 0) {
      this.savedItemsFlag = false;
    }

    this.userService.deleteFromSaved(savedProduct.id).subscribe();
  }



  //---------On deleting product from Cart and saving to 'save for later'------
  onMoveToCart(savedProduct) {
    console.log("Entered onMoveToCart");
    this.savedItemsFlag = true;

    this.product = savedProduct;
    this.subTotal = this.subTotal + this.product.price;

    //push it into cartProducts
    this.cartProducts.push(this.product);
    this.userService.updateCart(this.product).subscribe();

    //Delete From Saved Products
    this.onDeleteFromSavedItems(this.product);
  }



  //---------------To Place Order/Proceed To Buy-----------

  onPlaceOrder() {
    console.log("Entered onPlaceOrder");
  }
}
