import { Injectable } from '@angular/core';

@Injectable()
export abstract class AuthorizationService {
  constructor() {}

  public getUserAccess() {}

  // tslint:disable-next-line
  public saveUserAccessData(data: any) {}

  public abstract isWriteAllowed(screenId: number): boolean;

  public abstract isReadAllowed(screenId: number): boolean;
}
