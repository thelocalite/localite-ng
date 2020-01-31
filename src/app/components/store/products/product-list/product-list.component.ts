import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";
import { Store } from "src/app/models/store";
declare const M;

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})

/**
 * @technologic808
 *
 * ProductList Component
 *
 * This component takes list of products from
 * any parent component who wants to display their list of products
 *
 * It displays the product list as materialize cards
 */
export class ProductListComponent implements OnInit {
  // Takes array of products as input from parent component
  // To display wherever required
  @Input() products: Product[];
  @Input() store: Store;

  constructor(private productService: ProductService) {}

  ngOnInit() {}

  toast(name) {
    M.toast({ html: name + " added to Cart" });
  }
}
