import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthorizationService } from '@app/core/auth/';

@Injectable()
export class ReadAccessGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const screenId: number = route.data['access'];
    if (!this.authorizationService.isReadAllowed(screenId)) {

      return false;
    }
    return true;
  }
}
