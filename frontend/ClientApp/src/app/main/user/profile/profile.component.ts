import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "@app/core/auth";
import { Select, Store } from "@ngxs/store";
import { AppState } from "@app/app.state";
import { UserInfo, UserRegistration, permissionLevels } from "@app/core/models";
import { Observable, of } from "rxjs";
import {
  FetchUser,
  UpdateUser,
  CreateUser,
  DeleteUserFromProfile
} from "../user.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordValidator, MustMatch } from "@app/core/validators";
import { Navigate } from "@ngxs/router-plugin";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
  permissionLevels = permissionLevels;
  createUser = false;
  currentUser = false;
  deleteDialogOpened = false;
  userId = "";
  user$ = of(UserInfo.createNew());
  @Select((state: AppState) => state.user.loggedInUser)
  loggedInUser$!: Observable<UserInfo>;
  @Select((state: AppState) => state.user.selectedUser)
  selectedUser$!: Observable<UserInfo>;

  changePassword = false;
  errorMsg = "";
  form!: FormGroup;

  constructor(
    public readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.route.data.subscribe(data => {
        if (data.createUser) {
          this.createUser = true;
          this.currentUser = false;
          this.changePassword = true;
          this.user$ = of(UserInfo.createNew());
        } else {
          this.createUser = false;
          if (params.userId) {
            this.store.dispatch(new FetchUser(params.userId));
            this.user$ = this.selectedUser$;
            this.userId = params.userId;
            this.currentUser = false;
          } else {
            this.currentUser = true;
            this.user$ = this.loggedInUser$;
          }
        }
      });
    });

    this.user$.subscribe(user => this.buildForm(user));
  }

  get f() {
    return this.form.controls;
  }

  buildForm(user: UserInfo) {
    this.form = this.fb.group(
      {
        email: [user.email, [Validators.required, Validators.email]],
        firstName: [
          user.firstName,
          [Validators.required, Validators.maxLength(30)]
        ],
        lastName: [
          user.lastName,
          [Validators.required, Validators.maxLength(30)]
        ],
        permissionLevel: [
          user.permissionLevel,
          [Validators.min(1), Validators.max(7)]
        ],
        expectedNumberOfCalories: [
          user.expectedNumberOfCalories,
          [Validators.min(500), Validators.max(5000)]
        ]
      },
      {
        validator: MustMatch("password", "passwordConfirmation")
      }
    );
    if (this.changePassword) {
      this.changePasswordToggled();
    }
  }

  changePasswordToggled() {
    if (this.changePassword) {
      this.form.addControl(
        "password",
        this.fb.control("", [Validators.required, PasswordValidator])
      );
      this.form.addControl("passwordConfirmation", this.fb.control(""));
      this.form.updateValueAndValidity();
    } else {
      this.form.removeControl("password");
      this.form.removeControl("passwordConfirmation");
      this.form.updateValueAndValidity();
    }
  }

  onSubmit() {
    this.errorMsg = "";
    if (this.form.valid) {
      const user: UserRegistration = {
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        password: this.changePassword ? this.f.password.value : undefined,
        expectedNumberOfCalories: this.f.expectedNumberOfCalories.value,
        permissionLevel: this.isUserTypeShown()
          ? this.f.permissionLevel.value
          : undefined
      };

      if (this.createUser) {
        this.store.dispatch(new CreateUser(user)).subscribe(
          x => {},
          errors => {
            this.errorMsg = errors[0];
          }
        );
      } else {
        this.store.dispatch(new UpdateUser(user, this.userId)).subscribe(
          x => {
            if (this.currentUser) {
              this.store.dispatch(new Navigate(["/meals"]));
            } else {
              this.store.dispatch(new Navigate(["/users"]));
            }
          },
          errors => {
            this.errorMsg = errors[0];
          }
        );
      }
    }
  }

  isUserTypeShown(): boolean {
    return (
      this.auth.isAdmin() ||
      (this.auth.isUserManager() &&
        this.f.permissionLevel.value < permissionLevels.ADMIN)
    );
  }

  deleteAccount() {
    this.deleteDialogOpened = false;
    this.store.dispatch(
      new DeleteUserFromProfile(this.userId, this.currentUser)
    );
  }
}
