import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {Passenger} from '../../models/dashboard.interface';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Decrement, Increment, Reset} from '../../../store/actions/counter.actions';

interface AppState {
  counter: number;
}

// @ts-ignore
@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.css'],
  template: `
    <div *ngIf="!loading">
      <button (click)="goBack()">
        Back
      </button>

      <br>
      <br>
      <br>
      <br>
      <div>
        <button (click)="increment()">Increment</button>

        <div>Current Count: {{ (count$ | async).counter }}</div>

        <button (click)="decrement()">Decrement</button>

        <button (click)="reset()">Reset Counter</button>
      </div>
      <br>
      <br>
      <br>
      <br>

      <passenger-form [detail]="passenger"></passenger-form>

    </div>`
})
export class PassengerViewerComponent implements OnInit {
  passenger: Passenger;
  loading: boolean = true;
  count$: Observable<number>;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params) => this.dashboardService.getPassenger(params.id))
    ).subscribe((data: Passenger) => {
      if (data.admin_id) {
        this.passenger = data;
        this.loading = false;
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  increment() {
    this.store.dispatch(new Increment('nmbgkjg'));
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset() {
    this.store.dispatch(new Reset());
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
