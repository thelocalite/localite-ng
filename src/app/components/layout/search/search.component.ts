import { Component, OnInit } from '@angular/core';
import * as M from '../../../../assets/js/materialize.min';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

/**
 * Search Component
 * 
 * Displays a search bar on the home page
 * 
 * Gets the search query from the user and routes to search results page
 * 
 * where the query is picked up from the url and searched using product service
 */
export class SearchComponent implements OnInit {


  searchTermString: String;
  searchTerm = new FormControl('');

  constructor() { }

  ngOnInit(): void {

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.autocomplete');
      var instances = M.Autocomplete.init(elems, {
        data: {
          "Apple": null,
          "Microsoft": null,
          "Google": 'https://placehold.it/250x250'
        }
      });
    });
  }


}
