import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getProduct(this.productId).subscribe(product => (this.product = product));
  }


}
