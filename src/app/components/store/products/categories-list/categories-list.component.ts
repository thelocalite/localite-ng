import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.css"]
})
export class CategoriesListComponent implements OnInit {
  // Initialize Categories array
  categories: string[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // populate categories
    this.productService.getProductCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
  }
}
