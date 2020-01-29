import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/models/product";
import { ActivatedRoute } from "@angular/router";
import { StoreService } from "src/app/services/store.service";
import { ProductService } from "src/app/services/product.service";
import { Store } from "src/app/models/store";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.css"]
})

/**
 * @technologic808
 *
 * ProductPage Component
 *
 * Displays the Product Card along with the stores which have the product available
 *
 * The user can choose which store he wishes to buy the product from
 */
export class ProductPageComponent implements OnInit {
  // Initialize the Product and array of Stores
  product: Product;
  stores: Store[];

  // Gets Product Id from URL
  productId = +this.route.snapshot.paramMap.get("id");

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    // Get Product by URL
    this.getProduct();

    // Get Stores by Product Id
    this.getStores();
  }

  // Gets Product by URL Product ID
  getProduct(): void {
    this.productService
      .getProduct(this.productId)
      .subscribe(product => (this.product = product));
  }

  // Gets Vendors for a product by Product ID
  getStores(): void {
    this.storeService
      .getStoresByProductId(this.productId)
      .subscribe(stores => (this.stores = stores));
    console.log(this.stores);
  }

  // Gets Product Specific Prices for Vendors
  populateSpecificPrices() {
    this.stores.forEach(store => {
      this.productService
        .getStoreSpecificProductPrice(this.product.id, store.id)
        .subscribe(discountedPrice => (store.discountedPrice = discountedPrice));
    });
  }
}
