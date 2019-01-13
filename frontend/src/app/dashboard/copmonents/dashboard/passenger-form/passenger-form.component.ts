import {Component, Input} from '@angular/core';
import {Passenger} from '../../../models/dashboard.interface';


@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.css'],
  template: `
    <form #form="ngForm" novalidate>
      {{detail | json}}
      <div>
        Email:
        <input type="text" name="email" [ngModel]="detail?.email">
      </div>
      {{ form.value | json }}
    </form>`
})

export class PassengerFormComponent {
  @Input()
  detail: Passenger;

  constructor() {
  }
}
