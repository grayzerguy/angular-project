import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import store from '../redux/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if we got  token from redux
    if (store.getState().authState.token) {
      //duplicate the request object
      request = request.clone({
        // Add jwt Headers to it
        setHeaders: {

          authorization: "Bearer " + store.getState().authState.token
        }
      })
    }
    // next function for continue to next " middleware " :
    
    return next.handle(request);
  }
}
