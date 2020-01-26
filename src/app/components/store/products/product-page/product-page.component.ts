import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
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
  product: Product;



  constructor(private route: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService) { }

  ngOnInit() {
    this.getProduct();
  }

  // Gets Product by URL Product ID
  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.productService.getProduct(id).subscribe(product => (this.product = product));
  }

}
