import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'top-header',
  styleUrls: ['header.component.scss'],
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  params = {};

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {
  }

  logOut() {
    this.auth.logOutUser();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.params = this.route.firstChild.snapshot.data;
  }
}
