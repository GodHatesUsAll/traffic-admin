import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {NotFoundComponent} from './dashboard/copmonents/not-found/not-found.component';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {counterReducer} from './store/reducers/counter';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

const routes: Routes = [
  {
    path: '**', component: NotFoundComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    StoreModule.forRoot({count: counterReducer}),
    RouterModule.forRoot(routes, {enableTracing: false}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    DashboardModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
