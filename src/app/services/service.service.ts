import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Service } from '../models/service';
import { environment } from 'src/environments/environment';
import { Technician } from '../models/technician';
@Injectable({ providedIn: "root" })
export class ServiceService {
  private servicesUrl= environment.restAPIUrl + "/services";
  
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) { }

  /** GET all services from the server */
  getServices(): Observable<Service[]> {
    
    return this.http
      .get<Service[]>(this.servicesUrl)
      .pipe(catchError(this.handleError<Service[]>("getServices", [])));
  }

  /** GET service by id. Return `undefined` when id not found */
  getServiceNo404<Data>(id: number): Observable<Service> {
    const url = `${this.servicesUrl}/?id=${id}`;
    return this.http.get<Service[]>(url).pipe(
      map(services => services[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
      }),
      catchError(this.handleError<Service>(`getService id=${id}`))
    );
  }

  /** GET service by id. Will 404 if id not found */
  getService(id: number): Observable<Technician[]> {
    const url = `${this.servicesUrl}/${id}`;
    
    return this.http
      .get<Technician[]>(url)
      .pipe(catchError(this.handleError<Technician[]>(`getService id=${id}`)));
  }

  /* GET services whose name contains search term */
  searchservices(term: string): Observable<Service[]> {
    if (!term.trim()) {
      // if not search term, return empty service array.
      return of([]);
    }
    return this.http
      .get<Service[]>(`${this.servicesUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<Service[]>("searchServices", [])));
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



