import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-carousel',
  templateUrl: './store-carousel.component.html',
  styleUrls: ['./store-carousel.component.css']
})
export class StoreCarouselComponent implements OnInit {

  stores: Store[];
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.storeService.getStores().subscribe(stores => (this.stores = stores));
  }
}
