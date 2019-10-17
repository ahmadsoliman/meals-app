import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";

import { AuthService } from "@app/core/auth/";

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const accessLevels = route.data.access || [];
    const isAllowed = this.auth.isAccessAllowed(accessLevels);
    if (!isAllowed) {
      if (this.auth.isUser()) {
        this.router.navigate(["/meals"]);
      } else {
        this.router.navigate(["/users"]);
      }
    }

    return isAllowed;
  }
}
