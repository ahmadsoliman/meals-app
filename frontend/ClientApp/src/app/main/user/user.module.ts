import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GridModule } from "@progress/kendo-angular-grid";
import { DialogsModule } from "@progress/kendo-angular-dialog";

import { SharedModule } from "@app/shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { UserListComponent } from "./list/list.component";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserListComponent,
    ProfileComponent
  ],
  imports: [SharedModule, RouterModule, GridModule, DialogsModule],
  exports: []
})
export class UserModule {}
