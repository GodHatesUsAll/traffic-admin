import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CampaignStats} from '../../../models/dashboard.interface';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'campaign-snapshot',
  styleUrls: ['campaign-snapshot.component.scss'],
  templateUrl: 'campaign-snapshot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class CampaignSnapshotComponent implements OnInit, OnChanges {
  @Input()
  campaigns: CampaignStats[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output()
  rangeChange: EventEmitter<any> = new EventEmitter();

  ranges = [
    {value: 1, viewValue: 'Today'},
    {value: 7, viewValue: 'Week'},
    {value: 31, viewValue: 'Month'},
    {value: 90, viewValue: '3 Month'}
  ];

  data = [];

  displayedColumns: string[] = ['name', 'clicks', 'leads', 'cvr', 'epc', 'ecpm', 'revenue'];
  dataSource = new MatTableDataSource();

  constructor() {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    // this.data = this.campaigns.map(c => ({
    //   name: c.name,
    //   clicks: c.clicks,
    //   leads: c.leads,
    //   cvr: c.cvr,
    //   epc: c.epc,
    //   ecpm: c.ecpm,
    //   revenue: c.revenue,
    // }));

    this.dataSource.data = this.campaigns;
  }

  onChange(range) {
    this.rangeChange.emit(range);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes.campaigns.currentValue;
  }
}
