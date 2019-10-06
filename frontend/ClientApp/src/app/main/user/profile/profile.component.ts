import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor(public auth: AuthService, private readonly router: Router) {}
}
