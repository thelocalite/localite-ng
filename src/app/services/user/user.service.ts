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
  deleteFromCart(id: number): Observable<{}> {
    const url = `${this.cartUrl}/${id}`; // DELETE cartProducts/id
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError("deleteCartProduct")));
  }

  updateCart(cartProduct: CartProduct): Observable<CartProduct> {
    return this.http
      .post<CartProduct>(this.cartUrl, cartProduct, this.httpOptions)
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

  deleteFromSaved(id: number): Observable<{}> {
    const url = `${this.savedUrl}/${id}`; // DELETE cartProducts/id
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError("deleteSavedProduct")));
  }

  updateSaved(savedProduct: CartProduct): Observable<CartProduct> {
    return this.http
      .post<CartProduct>(this.savedUrl, savedProduct, this.httpOptions)
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
