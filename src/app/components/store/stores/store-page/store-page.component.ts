import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})
export class StorePageComponent implements OnInit {
  @Input() store: Store;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService) { }

  ngOnInit() {
    this.getStore();
    console.log(this.store);
  }

  getStore(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.storeService.getStore(id).subscribe(store => (this.store = store));
  }

}
