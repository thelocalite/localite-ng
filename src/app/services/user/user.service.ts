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
  // "https://my-json-server.typicode.com/ndivya03/json-server/cartProducts"; // URL to web api
private savedUrl = environment.restAPIUrl + "/cart/savedItems";
  // "https://my-json-server.typicode.com/ndivya03/json-server/savedProducts";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };


  constructor(private http: HttpClient) {}

  //---------------CartProducts Methods--------------

  /** GET all services from the server */
  getCartProducts(): Observable<CartProduct[]> {
    const url = `${this.cartUrl}/3`;
    return this.http
    .get<CartProduct[]>(url)
    .pipe(retry(3),catchError(this.handleError<CartProduct[]>("getCartProducts", [])));
  }

  /** DELETE: delete the product from the server */
  deleteFromCart(cartProduct: CartProduct): Observable<{}> {
    const url = `${this.cartUrl}/delete/3`; // DELETE cartProducts/id
    return this.http
      .post(url, cartProduct,this.httpOptions)
      .pipe(catchError(this.handleError("deleteCartProduct")));
  }

  updateCart(cartProduct: CartProduct): Observable<CartProduct> {
    const url = `${this.cartUrl}/add/3`;
    return this.http
      .post<CartProduct>(url, cartProduct, this.httpOptions)
      .pipe(catchError(this.handleError("updateCart", cartProduct)));
  }

  //----------------SavedProducts Methods-------------------

  getSavedProducts(): Observable<CartProduct[]> {
    const url = `${this.savedUrl}/3`;
    return this.http
      .get<CartProduct[]>(url)
      .pipe(retry(3),
        catchError(this.handleError<CartProduct[]>("getSavedProducts", []))
      );
  }

  // deleteFromSaved(savedProduct: CartProduct ){
  //       this.deleteFromCart(savedProduct);
  // }

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
