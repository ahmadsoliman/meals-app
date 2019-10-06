import {
  Component,
} from '@angular/core';
import { AuthService } from '@app/core/auth';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public auth: AuthService, private readonly store: Store) {}


}
