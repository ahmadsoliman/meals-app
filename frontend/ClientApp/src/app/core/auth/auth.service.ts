// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from '../api/user-api.service';
import { AuthToken, UserRegistration, UserInfo, permissionLevels } from '../models';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private userApi: UserApiService) { }

  private setSession(authResult: AuthToken): void {
    // Set the time that the access token will expire at
    // const expiresAt = JSON.stringify(
    //   authResult.expiresIn * 1000 + new Date().getTime()
    // );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('refresh_token', authResult.refreshToken);
    localStorage.setItem('permission_level', '' + authResult.permissionLevel);
    // localStorage.setItem('expires_at', expiresAt);
  }

  public login(email: string, password: string): Observable<AuthToken> {
    return this.userApi.login(email, password).pipe(tap(authToken => {
      this.setSession(authToken);
    }));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('permission_level');
  }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return accessToken != null && accessToken.length > 0;
  }

  // tslint:disable-next-line
  public register(data: UserRegistration): Observable<string> {
    return this.userApi.register(data);
  }

  // tslint:disable-next-line
  public userloggedIn(): Observable<UserInfo> {
    return this.userApi.getCurrentUser().pipe(tap((user) => {
      localStorage.setItem('permission_level', '' + user.permissionLevel);
    }));
  }

  public getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  public isUserAtLeast(accessLevel: number) {
    if (this.isAuthenticated()) {
      const permissionLevel = parseInt(localStorage.getItem('permission_level') || '0');
      return permissionLevel >= accessLevel;
    }
    return false;
  }

  public isAdmin(): boolean {
    return this.isUserAtLeast(permissionLevels.ADMIN);
  }

  public isUserManager(): boolean {
    return this.isUserAtLeast(permissionLevels.USER_MANAGER) && !this.isAdmin();
  }

  public isUser(): boolean {
    return this.isUserAtLeast(permissionLevels.USER) && !this.isUserManager() && !this.isAdmin();
  }

  public isAccessAllowed(accessLevels: number[]) {
    for (let i = 0; i < accessLevels.length; i++) {
      switch (accessLevels[i]) {
        case permissionLevels.USER: {
          if (this.isUser()) {
            return true;
          };
          break;
        }
        case permissionLevels.USER_MANAGER: {
          if (this.isUserManager()) {
            return true;
          };
          break;
        }
        case permissionLevels.ADMIN: {
          if (this.isAdmin()) {
            return true;
          };
          break;
        }
      }
    }
    return false;
  }
}
