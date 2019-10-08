// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserApiService } from '../api/user-api.service';
import { AuthToken, UserRegistration } from '../models';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private userApi: UserApiService, private router: Router) {}

  private setSession(authResult: AuthToken): void {
    // Set the time that the access token will expire at
    // const expiresAt = JSON.stringify(
    //   authResult.expiresIn * 1000 + new Date().getTime()
    // );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('refresh_token', authResult.refreshToken);
    // localStorage.setItem('expires_at', expiresAt);
  }

  public login(email, password): Observable<AuthToken> {
    const obs = this.userApi.login(email, password);
    obs.subscribe(authToken => {
      this.setSession(authToken);
      this.router.navigate(['/']);
    });
    return obs;
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // localStorage.removeItem('expires_at');
    // Go back to the login route
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return accessToken != null && accessToken.length > 0;
  }

  // tslint:disable-next-line
  public register(data: UserRegistration): Observable<string> {
    return this.userApi.createUser(data);
  }

  // tslint:disable-next-line
  public userloggedIn(authResult): Observable<any> {

    return of();
  }
  
  public getToken(): string {

    return '';
  }

  public isAccessAllowed(screenId: number): boolean {

    return true;
  }
}
