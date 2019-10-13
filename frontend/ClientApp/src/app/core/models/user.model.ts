export const permissionLevels = {
  ADMIN: 4,
  USER_MANAGER: 2,
  USER: 1
};

export class UserInfo {
  public constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public permissionLevel: Number,
    public expectedNumberOfCalories: Number
  ) {}
  public static createNew(): UserInfo {
    return new UserInfo('', '', '', '', 1, 2000);
  }
}

export class UsersList {
  public constructor(
    public users: UserInfo[],
    public total: number
  ) {}
}

export class AuthToken {
  public constructor(
    public accessToken: string,
    public refreshToken: string,
    public permissionLevel: number
  ) {}

  public static createNew(): AuthToken {
    return new AuthToken('', '', 0);
  }
}

export class UserRegistration {
  public constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public permissionLevel?: number,
    public expectedNumberOfCalories?: number
  ) {}
  public static createNew(): UserRegistration {
    return new UserRegistration('', '', '', '');
  }
}
