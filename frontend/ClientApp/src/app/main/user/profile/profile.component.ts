import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '@app/core/auth';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@app/app.state';
import { UserInfo, UserRegistration } from '@app/core/models';
import { Observable } from 'rxjs';
import { FetchUser, UpdateUser } from '../user.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator, MustMatch } from '@app/core/validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  userId: string;
  user$!: Observable<UserInfo>;
  @Select((state: AppState) => state.user.loggedInUser) loggedInUser$!: Observable<UserInfo>;
  @Select((state: AppState) => state.user.selectedUser) selectedUser$!: Observable<UserInfo>;

  changePassword = false;
  errorMsg: string;
  form: FormGroup;

  constructor(
    public readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.store.dispatch(new FetchUser(params['userId']));
        this.user$ = this.selectedUser$;
        this.userId = params['userId'];
      } else {
        this.user$ = this.loggedInUser$;
      }
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
        firstName: [user.firstName, [Validators.required, Validators.maxLength(30)]],
        lastName: [user.lastName, [Validators.required, Validators.maxLength(30)]],
        permissionLevel: [user.permissionLevel, [Validators.min(1), Validators.max(7)]],
        expectedNumberOfCalories: [user.expectedNumberOfCalories, [Validators.min(500), Validators.max(5000)]]
      },
      {
        validator: MustMatch('password', 'passwordConfirmation')
      }
    );
  }

  changePasswordToggled(flag) {
    if (flag) {
      this.form.addControl('password', this.fb.control('', [Validators.required, PasswordValidator]));
      this.form.addControl('passwordConfirmation', this.fb.control(''));
      this.form.updateValueAndValidity();
    } else {
      this.form.removeControl('password');
      this.form.removeControl('passwordConfirmation');
      this.form.updateValueAndValidity();
    }
  }

  onSubmit() {
    this.errorMsg = '';
    if (this.form.valid) {
      const user: UserRegistration = {
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        password: this.changePassword ? this.f.password.value : undefined,
        expectedNumberOfCalories: this.f.expectedNumberOfCalories.value,
        permissionLevel: this.userId ? this.f.permissionLevel.value : undefined
      };
      this.store.dispatch(new UpdateUser(user, this.userId)).subscribe(
        (x) => { },
        (err) => {
          console.error(err.code);
          this.errorMsg = err.description;
        }
      );
    }
  }
}
