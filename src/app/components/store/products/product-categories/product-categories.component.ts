import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-categories",
  templateUrl: "./product-categories.component.html",
  styleUrls: ["./product-categories.component.css"]
})

/**
 * Product Category Component
 *
 * Displays Products by Category
 */
export class ProductCategoriesComponent implements OnInit {
  // Declare and initialize array to store category products
  products: Product[] = [];

  // Gets the category from the URL
  category = this.route.snapshot.paramMap.get("category");

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getProductsForCategory();
  }

  // Calls ProductService method to get all products
  getProductsForCategory(): void {
    this.productService.getProducts().subscribe(
      products => (
        products.forEach(product => {
          if (product.category == this.category) {
            this.products.push(product);
          }
        }),
        console.log(this.products)
      )
    );
  }
}
