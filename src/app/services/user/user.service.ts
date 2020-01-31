import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap, catchError, retry } from "rxjs/operators";

import { CartProduct } from 'src/app/models/cartProducts';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: "root" }
  )
export class UserService {
  private cartUrl =  environment.restAPIUrl + "/cart/cartItems";
 
  private savedUrl = environment.restAPIUrl + "/cart/savedItems";
  

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };


  constructor(private http: HttpClient) {}

  //---------------CartProducts Methods--------------

  /** GET all Cart Items from the cart Table */
  getCartProducts(): Observable<CartProduct[]> {
    const url = `${this.cartUrl}/3`;
    return this.http
    .get<CartProduct[]>(url)
    .pipe(retry(3),catchError(this.handleError<CartProduct[]>("getCartProducts", [])));
  }

  /** DELETE: delete the cartItem/savedForLaterItem from the cart Table */
  deleteFromCart(cartProduct: CartProduct): Observable<{}> {
    const url = `${this.cartUrl}/delete/3`; // DELETE cartProducts/id
    return this.http
      .post(url, cartProduct,this.httpOptions)
      .pipe(catchError(this.handleError("deleteCartProduct")));
  }

  /** Insert: Insert a new Cart Item into the Cart Table a  
   *                          OR
   *          'onMoveToCart' from 'saved for later' items which 
   *           changes the 'savedForLater' flag of existing item 
   *           to false thereby making making it visible under 
   *           Shopping Cart. 
   */
  updateCart(cartProduct: CartProduct): Observable<CartProduct> {
    const url = `${this.cartUrl}/add/3`;
    return this.http
      .post<CartProduct>(url, cartProduct, this.httpOptions)
      .pipe(catchError(this.handleError("updateCart", cartProduct)));
  }

  //----------------SavedProducts Methods-------------------

  /** GET all SavedForLater Items from the cart Table */
  getSavedProducts(): Observable<CartProduct[]> {
    const url = `${this.savedUrl}/3`;
    return this.http
      .get<CartProduct[]>(url)
      .pipe(retry(3),
        catchError(this.handleError<CartProduct[]>("getSavedProducts", []))
      );
  }


  /** Insert: Insert a new 'SavedForLater' Item into the Cart Table 
   *                          OR
   *          'onSaveForLater' from 'ShoppingCart' items which 
   *           changes the 'savedForLater' flag of existing item 
   *           to true thereby making making it visible under 
   *           Saved For Later section. 
   */

  updateSaved(savedProduct: CartProduct): Observable<CartProduct> {
    const url = `${this.savedUrl}/add/3`; 
    return this.http
      .post<CartProduct>(url, savedProduct, this.httpOptions)
      .pipe(catchError(this.handleError("updateSaved", savedProduct)));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
