import { Product } from './product';
import { Store } from './store';

export interface CartProduct {
  id: number;
  vendor: Store;
  product:  Product;
  quantity: number;
  price: number;
  
}