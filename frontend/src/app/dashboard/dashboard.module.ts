import {forwardRef, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './containers/dashboard/dashboard.component';
import {PassengerViewerComponent} from './containers/passenger-viewer/passenger-viewer.component';

import {DetailComponent} from './copmonents/dashboard/detail/detail.component';
import {CountComponent} from './copmonents/dashboard/count/count.component';
import {PassengerFormComponent} from './copmonents/dashboard/passenger-form/passenger-form.component';
import {DashboardService} from './services/dashboard.service';
import {LeftSidebarComponent} from '../sidebars/left-sidebar/left-sidebar.component';
import {RootComponent} from './root.component';
import {HeaderComponent} from '../sidebars/header/header.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../auth/token.interceptor';
import {AuthGuard} from '../auth/auth.guard';
import {AuthInterceptor} from '../auth/auth.interceptor';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DailyRevenueComponent} from './copmonents/dashboard/daily-revenue/daily-revenue.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserModule} from '@angular/platform-browser';
import {CampaignSnapshotComponent} from './copmonents/dashboard/campaign-snapshot/campaign-snapshot.component';
import {WeekSnapshotComponent} from './copmonents/dashboard/week-snapshot/week-snapshot.component';
import {OffersComponent} from './containers/offers/offers.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: RootComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: DashboardComponent,
        data: {title: 'Dashboard', icon: 'dashboard'}
      },
      {
        path: 'admins/:id', component: PassengerViewerComponent,
        data: {title: 'Admins', icon: 'supervised_user_circle'}
      }
    ]
  },
  {
    path: 'offers', component: RootComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: OffersComponent,
        data: {title: 'Offers', icon: 'local_offer'}
      }
    ]
  },
];

@NgModule({
  declarations: [
    RootComponent,
    PassengerViewerComponent,
    DashboardComponent,

    DailyRevenueComponent,
    CampaignSnapshotComponent,
    WeekSnapshotComponent,
    DetailComponent,
    CountComponent,
    PassengerFormComponent,
    HeaderComponent,
    LeftSidebarComponent,
    OffersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DashboardService,
  ]
})

export class DashboardModule {

}
