import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';

import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserListComponent } from './list/list.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserListComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    GridModule
  ],
  exports: []
})
export class UserModule {}
