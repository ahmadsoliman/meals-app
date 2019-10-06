import { Injectable, OnInit } from '@angular/core';
import {
  AccessLevel,
  ModuleAccess,
  ModuleAccessList
} from './module-access.config';

import { AuthorizationService } from '@app/core/auth/authorization.service';
import { UserInfo } from '@app/core/models';

@Injectable()
export class ModuleAuthorizationService extends AuthorizationService
  implements OnInit {
  private readonly defaultAccess = AccessLevel.HIDE;
  private userAccess: { [id: string]: AccessLevel };

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getUserAccess();
  }

  public getUserAccess() {
    this.userAccess =
      JSON.parse(window.localStorage.getItem('userAccess')) || {};
  }

  // tslint:disable-next-line
  public saveUserAccessData(data: any) {
    const myData = {};
    ModuleAccessList.forEach((screen) => {
      if (screen.copyFrom) {
        myData[screen.id] = myData[screen.copyFrom];
      } else {
        const dataDetails = data.find(
          (acc) =>
            acc.sreenName.toLowerCase() === screen.PageAccessName.toLowerCase()
        );
        if (dataDetails) {
          myData[screen.id] = this.accessLevelToEnum(dataDetails.uerAccess);
        } else {
          // default value
          if (screen.default) {
            myData[screen.id] = screen.default;
          } else {
            myData[screen.id] = this.defaultAccess;
          }
        }
      }
    });

    this.userAccess = myData;
    window.localStorage.setItem(`userAccess`, JSON.stringify(this.userAccess));
  }

  public isWriteAllowed(screenId: ModuleAccess): boolean {
    let singleRouteAccess = this.defaultAccess;
    if (this.userAccess[screenId] !== undefined) {
      singleRouteAccess = this.userAccess[screenId];
    }
    return singleRouteAccess === AccessLevel.WRITE;
  }

  public isReadAllowed(screenId: ModuleAccess): boolean {
    let singleRouteAccess = this.defaultAccess;
    if (this.userAccess[screenId] !== undefined) {
      singleRouteAccess = this.userAccess[screenId];
    }
    return singleRouteAccess !== AccessLevel.HIDE;
  }

  private accessLevelToEnum(accessLevel: string): AccessLevel {
    switch (accessLevel.toLowerCase()) {
      case 'hide':
        return AccessLevel.HIDE;
      case 'read':
        return AccessLevel.READ;
      case 'write':
        return AccessLevel.WRITE;
      default:
        return AccessLevel.HIDE;
    }
  }
}
