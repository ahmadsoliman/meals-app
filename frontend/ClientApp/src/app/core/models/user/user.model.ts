export class UserInfo {
  private constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public permissionLevel: Number,
    public expectedNumberOfCalories: Number
  ) {}
  public static createNew(): UserInfo {
    return new UserInfo('', '', '', 1, 2000);
  }
}

export class AuthToken {
  private constructor(
    public accessToken: string,
    public refreshToken: string
  ) {}

  public static createNew(): AuthToken {
    return new AuthToken('', '');
  }
}

export class UserRegistration {
  private constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string
  ) {}
  public static createNew(): UserRegistration {
    return new UserRegistration('', '', '', '');
  }
}
