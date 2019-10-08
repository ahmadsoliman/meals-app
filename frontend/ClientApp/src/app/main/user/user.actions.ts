import { UserInfo, UserRegistration } from '@app/core/models';

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

export class Logout {
  static type = '[User] Logout';
  constructor(public user: UserInfo) {}
}
