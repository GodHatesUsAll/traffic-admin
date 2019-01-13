import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {WeekStats} from '../../../models/dashboard.interface';

@Component({
  selector: 'week-snapshot',
  styleUrls: ['week-snapshot.component.scss'],
  templateUrl: 'week-snapshot.component.html'
})
export class WeekSnapshotComponent implements OnInit {
  @Input()
  weekData: WeekStats[];

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['date', 'revenue'];

  ngOnInit(): void {
    this.dataSource.data = this.weekData;
  }

}
