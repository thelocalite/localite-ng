import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "../models/store";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storesUrl = environment.restAPIUrl + "/vendor"; // URL to web api 

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) { }

  /** GET all stores from the server */
  getStores(): Observable<Store[]> {
    return this.http
      .get<Store[]>(this.storesUrl)
      .pipe(catchError(this.handleError<Store[]>("getStores", [])));
  }

  /** GET Store by id. Will 404 if id not found */
  getStore(id: number): Observable<Store> {
    const url = `${this.storesUrl}/${id}`;
    return this.http
      .get<Store>(url)
      .pipe(catchError(this.handleError<Store>(`getStores id=${id}`)));
  }

  /** POST: add a new Store to the server */
  addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(this.storesUrl + "/add", store, this.httpOptions).pipe(catchError(this.handleError<Store>("addStore"))
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
