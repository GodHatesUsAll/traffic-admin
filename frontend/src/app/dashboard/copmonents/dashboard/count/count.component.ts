import {Component, Input} from '@angular/core';
import {Passenger} from '../../../models/dashboard.interface';

@Component({
  selector: 'passenger-count',
  template: `
      <h3>Airline Passengers!</h3>
      <div>
        Total admins: {{items?.length}}
      </div>
  `
})

export class CountComponent {
  @Input()
  items: Passenger[];

  constructor() {
  }
}
