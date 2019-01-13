import {Injectable} from '@angular/core';
import {CampaignStats, DashboardStats, Passenger} from '../models/dashboard.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class DashboardService {
  API_URL: string = 'http://localhost:5000';

  headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': '86400'
  });

  constructor(private http: HttpClient) {
  }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.API_URL}/users/admins`, {
      headers: this.headers
    });
  }

  getPassenger(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.API_URL}/users/admins/${id}`, {
      headers: this.headers
    });
  }

  getStatsData(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.API_URL}/stats/dashboard`, {
      headers: this.headers
    });
  }

  getCampaignData(range: number): Observable<CampaignStats[]> {
    return this.http.post<CampaignStats[]>(`${this.API_URL}/stats/dashboard/campaigns`, {
      range
    }, {
      headers: this.headers
    });
  }
}

