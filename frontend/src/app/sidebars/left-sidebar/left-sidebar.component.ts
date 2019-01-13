import {Component} from '@angular/core';

interface Navigation {
  name: string;
  path: string;
  exact: boolean;
  icon: string;
}

@Component({
  selector: 'left-sidebar',
  styleUrls: [],
  templateUrl: './left-sidebar.component.html'
})

export class LeftSidebarComponent {
  nav: Navigation[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      exact: true,
      icon: 'dashboard'
    },
    {
      name: 'Offers',
      path: '/offers',
      exact: true,
      icon: 'local_offer'
    },
  ];
}
