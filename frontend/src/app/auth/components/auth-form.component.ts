import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'auth-form',
  styleUrls: [],
  template: `
    <div class="splash_container">
      <mat-card>
        <form action="" [formGroup]="form" (ngSubmit)="submit()">

          <mat-card-header>
            <mat-card-title>
              <ng-content select=".login_type"></ng-content>
            </mat-card-title>
          </mat-card-header>

          <mat-form-field class="full-width">
            <input matInput placeholder="Email"
                   type="email"
                   formControlName="email">
            <mat-error *ngIf="!!form.controls.email.hasError('email')">
              Please enter a valid email address
            </mat-error>
            <mat-error *ngIf="!!form.controls.email.hasError('required')">
              Email is <strong>required</strong>
            </mat-error>
          </mat-form-field>

          <mat-form-field class="full-width" *ngIf="password">
            <input matInput
                   type="password"
                   formControlName="password"
                   placeholder="Password">
            <mat-error *ngIf="!!form.controls.password.hasError('required')">
              Password is <strong>required</strong>
            </mat-error>
          </mat-form-field>

          <button mat-stroked-button
                  color="primary"
                  [disabled]="!form.valid" type="submit">
            <ng-content select=".button-text"></ng-content>
          </button>
        </form>
      </mat-card>
    </div>`
})

export class AuthFormComponent implements OnInit {
  @Input()
  password: boolean = true;

  constructor(private fb: FormBuilder) {

  }

  form = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  @Output()
  handleSubmit: EventEmitter<any> = new EventEmitter();

  submit() {
    if (this.form.valid) {
      this.handleSubmit.emit(this.form.value);
    }
  }

  ngOnInit(): void {
    if (!this.password) {
      this.form.controls['password'].setValidators([]);
    }
  }

}
