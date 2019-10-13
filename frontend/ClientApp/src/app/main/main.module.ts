// main feature A module
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { UserModule } from './user/user.module';
import { MealsModule } from './meals/meals.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    SharedModule,
    UserModule,
    MealsModule
  ],
  exports: []
})
export class MainModule {}
