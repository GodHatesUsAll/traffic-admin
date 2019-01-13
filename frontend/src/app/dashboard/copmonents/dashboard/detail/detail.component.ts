import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Passenger} from '../../../models/dashboard.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['detail.component.css'],
  template: `
    <div>
      <div class="date">
        Admin ID:
        {{ detail.admin_id }}
      </div>
      <div *ngIf="editing">
        <input type="text" [value]="detail.email" (input)="onEmailChange(name.value)" #name>
      </div>
      <div *ngIf="!editing">
        {{ detail.email }}
      </div>
      <div>
        {{ detail.password }}
      </div>
      <button (click)="viewAdmin(detail.admin_id)">
        View
      </button>
      <!--<button (click)="toggleEdit()">-->
      <!--{{ editing ? "Save" : "Edit" }}-->
      <!--</button>-->
      <br>
      <br>
      <!--<button (click)="onRemove()">-->
      <!--Remove-->
      <!--</button>-->
    </div>`
})

export class DetailComponent implements OnChanges {
  @Input()
  detail: Passenger;

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  @Output()
  view: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;

  constructor() {
  }

  onEmailChange(email: string) {
    this.detail.email = email;
  }

  onRemove() {
    this.remove.emit(this.detail);
  }

  viewAdmin(id: number) {
    this.view.emit(id);
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.detail) {
      this.detail = changes.detail.currentValue;
    }
  }
}
