import { NgModule } from '@angular/core';

import { UserState } from '@app/main/user/user.state';
import { SharedModule } from '@app/shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { routing } from './user.routing';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [routing, SharedModule, NgxsModule.forFeature([UserState])],
  exports: []
})
export class UserModule {}
