import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: Store[];
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.storeService.getStores().subscribe(stores => (this.stores = stores));
    console.log(this.stores);
  }

}
