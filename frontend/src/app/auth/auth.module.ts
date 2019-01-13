import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {AuthFormComponent} from './components/auth-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {LoginGuard} from './login.guard';
import {MaterialModule} from '../material.module';
import {SignupComponent} from './components/signup/signup.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [LoginGuard]
  },
  {
    path: 'signup', component: SignupComponent, pathMatch: 'full', canActivate: [LoginGuard]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  providers: [
    LoginGuard,
    AuthService
  ]
})

export class AuthModule {

}
