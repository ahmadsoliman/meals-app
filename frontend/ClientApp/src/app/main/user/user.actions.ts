import { AuthToken, UserInfo, UserRegistration } from '@app/core/models';

// Actions
export class SetUserSession {
  static type = '[User] SetSession';
}

export class LoginWithEmailAndPassword {
  static type = '[User] LoginWithEmailAndPassword';
  constructor(public email: string, public password: string) {}
}

export class Signup {
  static type = '[User] Signup';
  constructor(public userRegistration: UserRegistration) {}
}

export class Activate {
  static type = '[User] Activate';
  constructor(public user: UserInfo) {}
}

export class ForgetPassword {
  static type = '[User] ForgetPassword';
  constructor(public email: string) {}
}

export class Logout {
  static type = '[User] Logout';
  constructor(public user: UserInfo) {}
}

export class LoginRedirect {
  static type = '[User] LoginRedirect';
}

export class LoginSuccess {
  static type = '[User] LoginSuccess';
  constructor(public authToken: AuthToken) {}
}
