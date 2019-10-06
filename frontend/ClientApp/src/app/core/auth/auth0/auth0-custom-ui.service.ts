// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthToken, UserInfo } from '@app/core/models';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Auth0Config } from './auth0.config';

@Injectable()
export class Auth0CustomUIService extends AuthService {


  constructor(public router: Router) {
    super();
  }

  // tslint:disable-next-line
  public login(email: string, password: string): Observable<any> {
    return Observable.create((observer) =>
      // this.auth0.login(
      //   {
      //     realm: Auth0Config.authConnectionType,
      //     email,
      //     password
      //   },
      //   (err, result) => {
      //     if (err) {
      //       return observer.error(err);
      //     }
      //     observer.next(result);
      //   }
      // )
      {}
    );
  }

  // tslint:disable-next-line
  public forgetPassword(email: string): Observable<any> {
    return Observable.create((observer) =>
      // this.auth0.changePassword(
      //   {
      //     connection: Auth0Config.authConnectionType,
      //     email
      //   },
      //   (err, result) => {
      //     if (err) {
      //       return observer.error(err);
      //     }
      //     observer.next(result);
      //   }
     {} 
    );
  }

  // Call this method in app.component.ts
  // if using path-based routing
  public handleAuthentication(): void {}

  // Call this method in app.component.ts
  // if using hash-based routing
  public handleAuthenticationWithHash(): void {}

  public setSession(authResult: AuthToken): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the login route
    this.router.navigate(['/login']);
    location.reload();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public isVerified(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    return userInfo ? userInfo.email_verified : false;
  }

  // tslint:disable-next-line: no-any
  public register(data: any): Observable<any> {
    return Observable.create((observer) =>
      // this.auth0.signup(
      //   {
      //     connection: Auth0Config.authConnectionType,
      //     email: data.email,
      //     password: data.password,
      //     user_metadata: data
      //   },
      //   (err, result) => {
      //     if (err) {
      //       return observer.error(err);
      //     }
      //     observer.next(result);
      //   }
      // )
      {}
    );
  }

  // tslint:disable-next-line: no-any
  public resendActivation(): Observable<any> {
    return Observable.create((observer) =>
      // this.auth0.signup(
      //   {
      //     connection: 'Username-Password-Authentication',
      //     email: 'email',
      //     password: 'password'
      //   },
      //   (err, result) => {
      //     if (err) {
      //       return observer.error(err);
      //     }
      //     observer.next(result);
      //   }
      // )
      {}
    );
  }

  private getUserInfo(authResult): Observable<UserInfo> {
    return Observable.create((observer) =>
      // this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      //   if (err) {
      //     return observer.error(err);
      //   }
      //   observer.next(user);
      // })
      {}
    );
  }

  public userloggedIn(authResult: AuthToken): Observable<void> {
    this.setSession(authResult);
    return this.getUserInfo(authResult).map((userInfo: UserInfo) => {
      this.saveUserInfo(userInfo);
    });
  }

  public saveUserInfo(userInfo: UserInfo) {
    localStorage.setItem('user_info', JSON.stringify(userInfo));
  }

  public getToken(): string {
    return '';
  }
}
