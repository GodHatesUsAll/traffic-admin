import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// import {default as decode} from 'jwt-decode';
import * as jwt_decode from 'jwt-decode';

interface Auth {
  token: string;
  success: boolean;
  message: string;
  code: number;
  error: object;
}

interface Signup {
  success: boolean;
  message: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {

  }

  headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400'
  });

  getToken() {
    return localStorage.getItem('token');
  }

  getTokenExpirationDate(token: string): Date {
    if (!token) {
      return null;
    }
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }

    if (token === 'null') {
      this.logOutUser();
      return true;
    }

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (!date) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  public isAuthenticated(): boolean {
    return !this.isTokenExpired(this.getToken());
  }

  public logOutUser() {
    localStorage.removeItem('token');
  }

  public sighupUser(email: string) {
    return this.http.post<Signup>('http://localhost:5000/auth/signup', {
      email,
    }, {
      headers: this.headers
    });
  }

  loginUser(form): Observable<Auth> {
    return this.http.post('http://localhost:5000/auth/login', {
      form,
    }, {
      headers: this.headers
    }).pipe(
      map((resp: Auth) => {
        if (resp.success) {
          localStorage.setItem('token', resp.token);
        }
        return resp;
      })
    );
  }
}
