import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-category-carousel",
  templateUrl: "./category-carousel.component.html",
  styleUrls: ["./category-carousel.component.css"]
})

/**
 * Categories Carousel
 *
 * Shows the categories that the user can browse
 */
export class CategoryCarouselComponent implements OnInit {
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
