import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'Login'
    }
  },
  {
    path: 'signup',
    component: RegistrationComponent,
    data: {
      breadcrumb: 'Sign Up'
    }
  }
];

export const routing = RouterModule.forChild(routes);
