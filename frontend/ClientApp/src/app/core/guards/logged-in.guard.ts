import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return Observable.create((observer) => {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/login']);
      }
      observer.next(true);
      return () => {};
    });
  }
}