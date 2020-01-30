import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthHttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (localStorage.getItem('email') && localStorage.getItem('token')) {
      req = req.clone(
          {setHeaders: {Authorization: localStorage.getItem('token')}});

      console.log(req);

    }

    return next.handle(req);
  }
}
