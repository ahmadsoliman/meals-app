import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth';
import { Store } from '@ngxs/store';
import { LoginWithEmailAndPassword } from '../user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly store: Store
  ) {}

  detailsForm: FormGroup;
  errorMsg: string;

  ngOnInit() {
    this.buildForm();
  }

  get f() {
    return this.detailsForm.controls;
  }

  buildForm() {
    this.detailsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMsg = '';
    // this.helperService.markFormAsTouched(this.detailsForm);
    if (this.detailsForm.valid) {
      this.store
        .dispatch(
          new LoginWithEmailAndPassword(
            this.detailsForm.controls.email.value,
            this.detailsForm.controls.password.value
          )
        )
        .subscribe(
          (x) => {},
          (err) => {
            console.error(err.code);
            this.errorMsg = err.description;
          }
        );
    }
    /*
     this.auth.login(this.detailsForm.controls.email.value, this.detailsForm.controls.password.value).subscribe((data) => {
       this.auth.setSession(data);
       this.router.navigate(['/dashboard]']);
     },
       (error) => {
         console.error(error.code);
         this.errorMsg = error.description;
       });*/
  }
}
