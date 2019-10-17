import { UserRegistration } from '@app/core/models';

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
  constructor() {}
}

export class FetchUsers {
  static type = '[User] FetchUsers';
}

export class ChangeUsersPage {
  static type = '[User] FetchUser';
  constructor(public skip: number) {}
}

export class FetchMyUser {
  static type = '[User] FetchMyUser';
}

export class FetchUser {
  static type = '[User] FetchUser';
  constructor(public userId: string) {}
}

export class CreateUser {
  static type = '[User] CreateUser';
  constructor(public user: UserRegistration) {}
}

export class UpdateUser {
  static type = '[User] UpdateUser';
  constructor(public user: UserRegistration, public userId?: string) {}
}

export class DeleteUser {
  static type = '[User] DeleteUser';
  constructor(public userId: string) {}
}

export class DeleteUserFromProfile {
  static type = '[User] DeleteUserFromProfile';
  constructor(public userId: string, public myUser: boolean) {}
}
