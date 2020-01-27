import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: "root" })
export class ProductService {

  private productsUrl = environment.restAPIUrl + "/product"; // URL to web api 

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) { }

  /** GET all products from the server */
  search(searchTerm: String): Observable<Product[]> {
    const url = `${this.productsUrl}/search/${searchTerm}`;
    return this.http
      .get<Product[]>(url)
      .pipe(catchError(this.handleError<Product[]>(`search Term=${searchTerm}`)));
  }


  /** GET all products from the server */
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(catchError(this.handleError<Product[]>("getProducts", [])));
  }

  /** GET all products by Store ID*/
  getProductsByStoreId(storeId: any): Observable<Product[]> {
    const url = `${this.productsUrl}/vendor/${storeId}`;
    return this.http
      .get<Product[]>(url)
      .pipe(catchError(this.handleError<Product[]>(`getProduct id=${storeId}`)));
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
    return this.http
      .get<Product>(url)
      .pipe(catchError(this.handleError<Product>(`getProduct id=${id}`)));
  }

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl + "/add", product, this.httpOptions).pipe(catchError(this.handleError<Product>("addProduct"))
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
