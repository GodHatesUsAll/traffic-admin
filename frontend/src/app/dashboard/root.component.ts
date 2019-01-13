import {Component} from '@angular/core';

@Component({
  selector: 'root-wrapper',
  styleUrls: [],
  template: `

    <mat-drawer-container class="app-sidenav-container" fullscreen>
      <mat-drawer
        #sidenav
        class="app-sidenav mat-elevation-z5"
        [mode]="'side'"
        [opened]="true"
        [position]="'start'"
      >
        <mat-toolbar color="primary" class="mat-elevation-z6"> 
          <span class="admin-logo">
            <a routerLink="/dashboard">
              <!--<img src="images/logo-admin.png" alt=""/>-->
              SITE NAME
            </a>
          </span>
        </mat-toolbar>
        <mat-nav-list dense>
          <left-sidebar></left-sidebar>
        </mat-nav-list>
      </mat-drawer>

      <div class="app-sidenav-content">
        <top-header></top-header>
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </div>
    </mat-drawer-container>﻿
  `
})

export class RootComponent {

}
