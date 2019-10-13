import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NF404Component } from './shared/components/404/404.component';
import { LoginComponent } from './main/user/login/login.component';
import { MainLayoutComponent } from './main/layout/main-layout/main-layout.component';
import { LoggedInGuard, AccessGuard } from './core/guards';
import { RegistrationComponent } from './main/user/registration/registration.component';
import { UserListComponent } from './main/user/list/list.component';
import { permissionLevels } from './core/models';
import { EmptyComponent } from './shared/components/empty/empty.component';
import { ProfileComponent } from './main/user/profile/profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent, pathMatch: 'full' },

  {
    path: '404',
    component: NF404Component
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [ AccessGuard ],
        data: {
          access: permissionLevels.USER_MANAGER
        }
      },
      {
        path: 'users/:userId',
        component: ProfileComponent,
        canActivate: [ AccessGuard ],
        data: {
          access: permissionLevels.USER_MANAGER
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          access: permissionLevels.USER
        }
      },
      {
        path: 'meals',
        component: EmptyComponent,
        data: {
          access: permissionLevels.USER
        }
      },
      {
        path: '',
        redirectTo: 'meals',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
