import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  // Add Product to bind to form
  product: Product = new Product();



  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  addProduct() {
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe({
      complete: () => { console.log("Product add completed") }, // completeHandler
    });
  }

}
