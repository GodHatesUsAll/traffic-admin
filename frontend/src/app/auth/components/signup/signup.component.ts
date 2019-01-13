import {Component, Input} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'signup-page',
  styleUrls: [],
  template: `
    <auth-form
      [password]="false"
      (handleSubmit)="handleSignup($event)">
      <div class="login_type">Submit request to get an account</div>
      <span class="button-text">Register</span>
    </auth-form>`
})
export class SignupComponent {
  constructor(private auth: AuthService, private router: Router, public snackBar: MatSnackBar) {
  }

  handleSignup(data) {
    this.auth.sighupUser(data.email).subscribe(resp => {
      this.snackBar.open(resp.message, null, {
        duration: 4000,
      });
    });
  }
}
