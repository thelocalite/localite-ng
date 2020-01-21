import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { CartProduct } from '../models/cartProducts';

@Injectable({ providedIn: "root" })
export class UserService {
  private cartUrl = "https://my-json-server.typicode.com/ndivya03/json-server/cartProducts"; // URL to web api
  private savedUrl = "https://my-json-server.typicode.com/ndivya03/json-server/savedProducts";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) { }

  //---------------CartProducts Methods--------------

  /** GET all services from the server */
  getCartProducts(): Observable<CartProduct[]> {

    return this.http
      .get<CartProduct[]>(this.cartUrl)
      .pipe(catchError(this.handleError<CartProduct[]>("getCartProducts", [])));
  }


  /** DELETE: delete the product from the server */
  deleteFromCart(id: number): Observable<{}> {
    const url = `${this.cartUrl}/${id}`; // DELETE cartProducts/id
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteCartProduct'))
      );
  }

  updateCart(cartProducts: CartProduct[]): Observable<CartProduct[]> {
    return this.http.put<CartProduct[]>(this.cartUrl, cartProducts, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateCart', cartProducts))
      );
  }

  //----------------SavedProducts Methods-------------------

  getSavedProducts(): Observable<CartProduct[]> {

    return this.http
      .get<CartProduct[]>(this.savedUrl)
      .pipe(catchError(this.handleError<CartProduct[]>("getSavedProducts", [])));
  }

  deleteFromSaved(id: number): Observable<{}> {
    const url = `${this.savedUrl}/${id}`; // DELETE cartProducts/id
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteSavedProduct'))
      );
  }

  updateSaved(savedProducts: CartProduct[]): Observable<CartProduct[]> {
    return this.http.put<CartProduct[]>(this.savedUrl, savedProducts, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateSaved', savedProducts))
      );
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












