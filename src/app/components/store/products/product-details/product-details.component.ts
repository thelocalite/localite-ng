import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
/**
 * Product Details Component
 *
 * This is the Product Card
 *
 * This card displays product information which can be reused by other components
 *
 */
export class ProductDetailsComponent implements OnInit {
  // Takes product id as input from parent component
  @Input() productId: number;
  product: Product;

  // Flag to check the current page
  isProductPage: boolean = false;
  isStorePage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    // Checks URL
    this.checkPageUrl();

    // Gets Product
    this.getProduct();
  }

  // Gets Product By Product ID
  getProduct(): void {
    this.productService
      .getProduct(this.productId)
      .subscribe(product => (this.product = product));
  }

  // Checks the current page and updates flags
  checkPageUrl() {
    this.router.url.split("/").forEach(route => {
      switch (route) {
        case "product":
          this.isProductPage = true;
          break;
        case "store":
          this.isStorePage = true;
          break;
        default:
          this.isProductPage = false;
          this.isStorePage = false;
          break;
      }
    });
    console.log("isProductPage ? " + this.isProductPage);
    console.log("isStorePage ? " + this.isStorePage);
  }
}
