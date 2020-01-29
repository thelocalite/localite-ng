import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  // Add Product to bind to form
  product: Product = new Product();

  ngOnChanges($event) {
    console.log("event : " + event);
  }

  constructor(private productService: ProductService) {}

  ngOnInit() {}

  /**
   * @method addProduct :  Adds Product to Database
   * Calls addProduct() method of Product Service
   * to send Product to Spring Boot REST API
   * using POST method
   */
  addProduct() {
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe({
      // completeHandler
      complete: () => {
        console.log("Product add completed");
        this.resetForm();
      }
    });
  }

  // Resets form by resetting product object
  resetForm() {
    this.product = new Product();
    this.product.imageUrl = "";
  }
}
