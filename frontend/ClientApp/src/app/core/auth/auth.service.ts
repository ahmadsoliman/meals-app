// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AuthService {
  // tslint:disable-next-line
  public abstract forgetPassword(email: string): Observable<any>;

  // tslint:disable-next-line
  public abstract login(email, password): Observable<any>;

  public handleAuthentication(): void {}

  // tslint:disable-next-line
  public setSession(authResult: any): void {}

  public logout(): void {}

  public abstract isAuthenticated(): boolean;

  public abstract isVerified(): boolean;

  // tslint:disable-next-line
  public abstract resendActivation(): Observable<any>;

  // tslint:disable-next-line
  public abstract register(data: any): Observable<any>;

  // tslint:disable-next-line
  public abstract userloggedIn(authResult): Observable<any>;
  
  public abstract getToken(): string;
}
