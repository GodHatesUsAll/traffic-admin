import {Component, OnInit} from '@angular/core';
import {DailyStats, DashboardStats, Passenger} from '../../models/dashboard.interface';
import {DashboardService} from '../../services/dashboard.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.component.scss'],
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  passengers: Passenger[];

  stats: DashboardStats;

  constructor(private dashboardService: DashboardService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dashboardService.getPassengers().subscribe((data: Passenger[]) => this.passengers = data);
    this.dashboardService.getStatsData().subscribe((stats: DashboardStats) => {
      this.stats = stats;
    });
  }

  handleRemove(event) {
    this.passengers = this.passengers.filter((passenger: Passenger) => passenger.admin_id !== event.admin_id);
  }

  handleView(id) {
    this.router.navigate(['dashboard/admins', id]);
  }

  handleEdit(event) {
    this.passengers = this.passengers.map((passenger: Passenger) => {
      if (passenger.admin_id === event.admin_id) {
        passenger = event;
      }
      return passenger;
    });
  }

  onRangeChange(range) {
    this.dashboardService.getCampaignData(range).subscribe(data => {
      this.stats.campaign = data;
    });
  }
}
