import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.auth.getToken()
      })
    });

    return next.handle(authReq);
  }
}
