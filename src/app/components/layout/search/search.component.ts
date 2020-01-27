import { Component, OnInit } from '@angular/core';
import * as M from '../../../../assets/js/materialize.min';

import { Product } from "../../../models/product";

import { ProductService } from '../../../services/product.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[];
  searchTerm: String;

  constructor(private productService: ProductService) { }

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
