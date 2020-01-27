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

  // Products array to store search results
  products: Product[];

  // Gets the search term from the URL
  searchTermString: String = this.route.snapshot.paramMap.get("searchTerm");

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Searches based on query
    this.search(this.searchTermString);

    /**
     * This was a really tricky one.
     * 
     * This line of code is for making the persistent search box work
     * 
     * It subscribes to the Observable returned by the ActivatedRoute objects paramMap property
     * 
     * Whenever there is a change in the searchbox, it calls the callback function which calls the search again!
     */
    this.route.paramMap.subscribe(data => (this.search(this.route.snapshot.paramMap.get("searchTerm"))));
  }


  // Calls the search API using the string entered by the user 
  search(searchTermString: String) {
    console.log("Search is called " + this.searchTermString)
    this.productService.search(searchTermString).subscribe(products => (this.products = products));
    console.log(this.products);
  }

}
