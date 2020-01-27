import { Component, OnInit } from '@angular/core';
import * as M from '../../../../assets/js/materialize.min';

import { Observable, Subject } from "rxjs";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

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
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    });
  }
}
