import {Component, Input} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'login-page',
  styleUrls: [],
  template: `
    <div class="login-page">
      <auth-form
        [password]="true"
        (handleSubmit)="handleLogin($event)">
        <div class="login_type">For Admins</div>
        <span class="button-text">Login</span>
      </auth-form>
    </div>`
})

export class LoginComponent {
  constructor(private auth: AuthService, private router: Router, public snackBar: MatSnackBar) {
  }

  handleLogin(data) {
    this.auth.loginUser(data).subscribe(resp => {
      if (resp.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open(resp.message, null, {
          duration: 4000,
        });
      }
    });
  }
}
