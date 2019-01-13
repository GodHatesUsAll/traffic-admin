import {Component, Input, OnInit} from '@angular/core';
import {DailyStats, LineChart} from '../../../models/dashboard.interface';
// import * as shape from 'd3-shape';

@Component({
  selector: 'daily-revenue',
  templateUrl: 'daily-revenue.component.html'
})

export class DailyRevenueComponent implements OnInit {
  @Input()
  daily: DailyStats[];

  view: any[] = [700, 400];
  stats: LineChart[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  animations = true;
  roundDomains = true;
  // curve = shape.curveBasis;
  yAxisLabel = 'Population';
  autoScale = true;
  showGridLines = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  ngOnInit(): void {
    if (this.daily) {
      this.stats = [{
        name: 'Daily Stats',
        series:
          this.daily.map(stat => ({name: stat.month, value: +stat.revenue}))
      }];
    }
  }
}
