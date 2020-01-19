import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private productsUrl = "api/products"; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };


  constructor(private http: HttpClient) { }

  /** GET all products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      catchError(this.handleError<Product[]>("getProducts", [])));
  }

  /** GET product by id. Return `undefined` when id not found */
  getProductNo404<Data>(id: number): Observable<Product> {
    const url = `${this.productsUrl}/?id=${id}`;
    return this.http.get<Product[]>(url).pipe(
      map(products => products[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
      }),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /* GET products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Product[]>("searchProducts", []))
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
