import { UserInfo } from '@app/core/models';

export class UserAuthInfoStateModel {
  private constructor(public user: UserInfo, public initialized?: boolean) {}
  public static createNew(): UserAuthInfoStateModel {
    return new UserAuthInfoStateModel(UserInfo.createNew(), false);
  }
}
