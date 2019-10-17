import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UnAuthorizedRequestsInterceptor<T> implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).catch((res: HttpErrorResponse) => {
      if (res.status === 401) {
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: this.router.url }
        });
        return Observable.of();
      } else if (res.status === 403) {
        return Observable.of();
      } else {
        // if (!res.error.msg) {
        //     res.error.msg = 'Sorry.. An error occurred';
        // }
        return throwError(res.error);
      }
    });
  }
}
