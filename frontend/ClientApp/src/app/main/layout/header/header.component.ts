import {
  Component,
} from '@angular/core';
import { AuthService } from '@app/core/auth';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  items: any[] = [
    {
      text: 'userName',
      items: [
        {
          text: 'Profile',
          path: '/profile'
        }, {
          text: 'Logout',
          path: '/logout'
        }
      ]
    }
  ];

  constructor(
    public auth: AuthService,
    private readonly store: Store,
    private readonly router: Router
  ){ }


  public onSelect({ item }): void {
    if (item.path === '/logout') {
      this.auth.logout();
    } else if(item.path) {
      this.router.navigate([item.path]);
    }
  }
}
