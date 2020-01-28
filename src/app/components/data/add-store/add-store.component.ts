import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {
  // Add Store to bind to form
  store: Store = new Store();

  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  /**
   * @method addStore :  Adds Store to Database 
   * Calls addStore() method of Store Service 
   * to send Store to Spring Boot REST API 
   * using POST method 
   */

  addStore() {
    console.log(this.store);
    this.storeService.addStore(this.store).subscribe({
      // completeHandler
      complete: () => {
        console.log("Store add completed");
        this.resetForm();
      },
    });
  }

  // Resets form by resetting product object
  resetForm() {
    this.store = new Store();
  }
}
