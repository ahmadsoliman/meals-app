import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth';
import { UserRegistration } from '@app/core/models';
import { MustMatch, PasswordValidator } from '@app/core/validators';
import { Signup } from '@app/main/user/user.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private readonly router: Router,
    public formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  errorMsg: string;
  detailsForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    // todo uncomment when logout function is ready
    /*
    if (!this.auth.isAuthenticated()) {
      this.buildForm();
    } else {
      this.router.navigate(['/dashboard']);
    }*/
  }

  buildForm() {
    this.detailsForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.maxLength(30)
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.maxLength(30)
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        company: new FormControl('', [
          Validators.required,
          Validators.maxLength(30)
        ]),
        position: new FormControl('', [Validators.maxLength(30)]),
        password: new FormControl('', [Validators.required, PasswordValidator]),
        passwordConfirmation: new FormControl('', [])
      },
      {
        validator: MustMatch('password', 'passwordConfirmation')
      }
    );
  }

  get f() {
    return this.detailsForm.controls;
  }

  onSubmit() {
    this.errorMsg = '';
    if (this.detailsForm.valid) {
      const userRegistration: UserRegistration = {
        firstName: this.detailsForm.controls.firstName.value,
        lastName: this.detailsForm.controls.lastName.value,
        email: this.detailsForm.controls.email.value,
        password: this.detailsForm.controls.password.value,
        position: this.detailsForm.controls.position.value,
        company: this.detailsForm.controls.company.value
      };
      this.store.dispatch(new Signup(userRegistration)).subscribe(
        (x) => {},
        (err) => {
          console.error(err.code);
          this.errorMsg = err.description;
        }
      );

      /*
    this.auth.register(this.detailsForm.value).subscribe((data) => {
      this.router.navigate(['/dashboard]']);
    },
      (error) => {
        console.log(error.code);
        this.errorMsg = error.description;
      });
      */
    }
  }
}
