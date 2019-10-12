import { UserInfo, UserRegistration } from '@app/core/models';

// Actions
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

export class FetchUsers {
  static type = '[User] FetchUsers';
}

export class DeleteUser {
  static type = '[User] DeleteUser';
  constructor(public userId: string) {}
}