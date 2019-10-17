import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs/internal/observable/throwError";
import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";
import { apiUrlsConfig } from "./api.config";
import { AuthToken, UserRegistration, UserInfo, UsersList } from "../models";

@Injectable()
export class UserApiService {
  private readonly usersUrl = apiUrlsConfig.usersUrl;
  private readonly currentUserUrl = apiUrlsConfig.currentUserUrl;
  private readonly loginUrl = apiUrlsConfig.loginUrl;
  private readonly registerUrl = apiUrlsConfig.registerUrl;

  constructor(private readonly http: HttpClient) {}

  public register(data: UserRegistration): Observable<string> {
    return this.http
      .post<{ id: string }>(this.registerUrl, data)
      .pipe(map(res => res.id))
      .pipe(catchError(this.handleError));
  }

  public createUser(data: UserRegistration): Observable<string> {
    return this.http
      .post<{ id: string }>(this.usersUrl, data)
      .pipe(map(res => res.id))
      .pipe(catchError(this.handleError));
  }

  public login(email: string, password: string): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.loginUrl, { email, password })
      .pipe(catchError(this.handleError));
  }

  public getCurrentUser(): Observable<UserInfo> {
    return this.http
      .get<UserInfo>(this.currentUserUrl)
      .pipe(catchError(this.handleError));
  }

  public getUsers(skip = 0): Observable<UsersList> {
    let params = new HttpParams();
    if (skip) {
      params = params.append("skip", "" + skip);
    }
    return this.http
      .get<UsersList>(this.usersUrl, { params })
      .pipe(catchError(this.handleError));
  }

  public getUser(userId: string): Observable<UserInfo> {
    return this.http
      .get<UserInfo>(this.usersUrl + "/" + userId)
      .pipe(catchError(this.handleError));
  }

  public updateUser(
    user: UserRegistration,
    userId: string | undefined
  ): Observable<object> {
    return this.http
      .patch(userId ? this.usersUrl + "/" + userId : this.currentUserUrl, user)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(userId: string, myUser = false): Observable<object> {
    let url = this.usersUrl + "/" + userId;
    if (myUser) {
      url = this.currentUserUrl;
    }
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message: string;
    // let statusCode: number;
    if (error instanceof ErrorEvent) {
      message = error.error.message ? error.error.message : error.toString();
    } else {
      const err = error.error || JSON.stringify(error);
      // statusCode = error.status;
      message = err;
    }
    console.error(message);
    return throwError(error);
  }
}
