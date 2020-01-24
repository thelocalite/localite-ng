import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {
  @Input() storeId: number;
  store: Store;
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getStore();
  }

  getStore(): void {
    this.storeService.getStore(this.storeId).subscribe(store => (this.store = store));
  }

}
