import { Component, OnInit } from '@angular/core';

declare var M: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.carousel');
      var instances = M.Carousel.init(elems, {
        dist: -5,
        padding: 50,
        numVisible: 5,
        duration: 200
      });
    });
  }

}
