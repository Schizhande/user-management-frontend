import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';

const apiUrl = 'http://localhost:8087/v1/'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}
 
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: User[];

  constructor(private http: HttpClient) { }

  createUser(user: any) {
    return this.http.post<any>(apiUrl + 'users', user);
  }

  editUser(user: any) {
    console.log(user)
    return this.http.put<any>(apiUrl + 'users/' + user.id, user);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(apiUrl + 'users/all');
  }

  getUser(id): Observable<any> {
    return this.http.get<any>(apiUrl + 'users/' + id);
  }

  enableUser(id: any, enable: any) {
    var params = new HttpParams();
    params.append("enable", enable);
    return this.http.patch<any>(apiUrl + "users/" + id + "?enable=" + enable, enable);
  }


  getUserInformation(): Observable<any> {
    return this.http.get<any>(apiUrl + "user-information/my-account");
  }

  editUserInformation(userInfo: any) {
    return this.http.post<any>(apiUrl + "user-information/my-account", userInfo);
  }

  verifyUser(verifyToken: any) {
    return this.http.post<any>(apiUrl + "users/verify", verifyToken);
  }


}
