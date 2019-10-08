import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { apiUrlsConfig } from './api.config';
import { AuthToken, UserRegistration } from '../models';

@Injectable()
export class UserApiService {
  private readonly usersUrl = apiUrlsConfig.usersUrl;
  private readonly loginUrl = apiUrlsConfig.loginUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  // tslint:disable-next-line: no-any
  public createUser(data: UserRegistration): Observable<any> {
    return this.http
      .post<{id: string}>(this.usersUrl, data)
      .pipe(map(data => data.id))
      .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line: no-any
  public login(email: string, password: string): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.loginUrl, { 'email': email, 'password': password })
      .pipe(catchError(this.handleError));
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
