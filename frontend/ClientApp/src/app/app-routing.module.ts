import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NF404Component } from './shared/components/404/404.component';
import { LoginComponent } from './main/user/login/login.component';
import { MainLayoutComponent } from './main/layout/main-layout/main-layout.component';
import { LoggedInGuard } from './core/guards';


const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: '404',
    component: NF404Component
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent
      // },
      // {
      //   path: 'user',
      //   loadChildren: './main/user/user.module#UserModule'
      // },

      {
        path: '',
        redirectTo: 'user',
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
