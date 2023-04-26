import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request.clone({ url: environment.apiUrl+request.url });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    if(localStorage.getItem('user'))
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
    return next.handle(req);
  }
}



export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },
];