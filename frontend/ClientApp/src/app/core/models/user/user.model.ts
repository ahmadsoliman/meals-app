export class UserInfo {
  private constructor(
    public email: string,
    public emailVerified: boolean,
    public name: string,
    public nickname: string,
    public picture: string,
    public sub: string,
    public updatedAt: Date
  ) {}
  public static createNew(): UserInfo {
    return new UserInfo('', false, '', '', '', '', undefined);
  }
}

export class AuthToken {
  private constructor(
    public accessToken: string,
    public idToken: string,
    public expiresIn: number
  ) {}

  public static createNew(): AuthToken {
    return new AuthToken('', '', 0);
  }
}

export class UserRegistration {
  private constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public company: string,
    public position: string,
    public password: string
  ) {}
  public static createNew(): UserRegistration {
    return new UserRegistration('', '', '', '', '', '');
  }
}
