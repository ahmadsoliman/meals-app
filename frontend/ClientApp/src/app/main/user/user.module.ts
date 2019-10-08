import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { routing } from './user.routing';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [routing, SharedModule],
  exports: []
})
export class UserModule {}
