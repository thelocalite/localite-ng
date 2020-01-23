import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "../models/store";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // private storesUrl = "https://localite-core.herokuapp.com/vendor"; // URL to web api PRODUCTION
  private storesUrl = "http://localhost/vendor"; // URL to web api DEVELOPMENT

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
