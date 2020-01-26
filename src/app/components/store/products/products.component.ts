import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

/**
 * @technologic808
 * 
 * Products Component
 * 
 * This component displays the list of all available products
 * 
 * It passes the list of products to product list component
 */

export class ProductsComponent implements OnInit {
  // Initializes array of products
  products: Product[];

  // Injects ProductService Dependency
  constructor(private productService: ProductService) { }

  // onInit Lifecycle hook
  // gets all products once the component is initialized 
  ngOnInit() {
    this.getAllProducts();
  }

  // Calls ProductService method to get all products
  getAllProducts(): void {
    this.productService.getProducts().subscribe(products => (this.products = products));
    console.log(this.products);
  }
}