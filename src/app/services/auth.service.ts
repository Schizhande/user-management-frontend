import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = 'http://localhost:8089/oauth/check_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private http: HttpClient) { }

  isAuthenticated(): boolean {
    var token = localStorage.getItem('token');

    return token != null && !this.isTokenExpired(token);
  }

  isTokenExpired(token: String): boolean {
    let headers =
      new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa("mobile:pin")
      });
    this.http.get<any>(apiUrl + "?token=" + token, { headers: headers })
      .subscribe(data => {
        console.log(data);
        if (data.active) {
          return true;
        } else {
          return false;
        }
      },
        err => {
          alert(err.error.message
            ? err.error.message
            : 'An error occurred whilst checking token ');
        }

      );

    return false;
  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['auth/login']);
  }
}
