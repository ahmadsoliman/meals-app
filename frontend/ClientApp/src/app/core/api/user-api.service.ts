import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserApiService {
  private readonly registrationUrl = '/dbconnections/signup';
  private readonly loginUrl = '/login';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  // tslint:disable-next-line: no-any
  public register(data: any): Observable<any> {
    const params: HttpParams = new HttpParams();
    return this.http
      .post(this.registrationUrl, data, { params })
      .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line: no-any
  public login(email: string, password: string): Observable<any> {
    const params: HttpParams = new HttpParams();
    params.set('email', email);
    params.set('password', password);
    const obs = this.http
      .get(this.loginUrl, { params })
      .pipe(catchError(this.handleError));
    obs.subscribe(() => {
      return Observable.of(this.router.navigate(['/callback']));
    });
    return obs;
  }

  private handleError(error: HttpErrorResponse) {
    let message: string;
    let statusCode: number;
    if (error instanceof ErrorEvent) {
      message = error.error.message ? error.error.message : error.toString();
    } else {
      const err = error.error || JSON.stringify(error);
      statusCode = error.status;
      message = err;
    }
    return throwError(error);
  }
}
