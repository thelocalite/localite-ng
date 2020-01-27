import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

/**
 * Search Results Component
 * 
 * Gets input from the url 
 * 
 * Searches the term using rest API
 * 
 * and displays the results using product list component
 */

export class SearchResultsComponent implements OnInit {
  products: Product[];
  searchTermString: String = this.route.snapshot.paramMap.get("searchTerm");

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.search();
  }

  search() {
    console.log("Search is called " + this.searchTermString)
    this.productService.search(this.searchTermString).subscribe(products => (this.products = products));
    console.log(this.products);
  }

}
