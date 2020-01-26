import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})

/**
 * @technologic808
 * 
 * StorePage Component
 * 
 * Displays the products available for a particular store
 */
export class StorePageComponent implements OnInit {

  // Takes store as input from parent component
  @Input() store: Store;

  // Initializes Products array to store products for the store
  products: Product[];

  // Gets the store id from the URL
  storeId = +this.route.snapshot.paramMap.get("id");

  // Dependency Injection
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService) { }

  /**
   * OnInit Component Lifecycle hook
   * On Initialization of component,    
   * gets store by url id,
   * gets products by store
   */
  ngOnInit() {
    this.getStore();
    console.log(this.store);
    this.getProductsByStoreId(this.storeId);
  }

  // Gets Store by URL Store ID
  getStore(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.storeService.getStore(id).subscribe(store => (this.store = store));
  }

  // Gets Products by Store ID
  getProductsByStoreId(storeId): void {
    this.productService.getProductsByStoreId(storeId).subscribe(products => (this.products = products));
    console.log(this.products);
  }
}
