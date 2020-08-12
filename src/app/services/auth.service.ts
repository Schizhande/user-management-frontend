import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = 'http://localhost:8087/oauth/check_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private http: HttpClient) { }

  isAuthenticated(): boolean {
    var token = sessionStorage.getItem('token');

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
          if(err.error.message){
            alert(err.error.message);
          }else{
            alert(err.error.error_description);
          }
        }

      );

    return false;
  }

  logout(): void {
    sessionStorage.clear();
    this._router.navigate(['auth/login']);
  }
}
