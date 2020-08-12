import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Authority } from '../models/authority';

const apiUrl = 'http://localhost:8087/v1/user-permission/'

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesService {

  public authorities: Authority[];

  constructor(private http: HttpClient) { }

  createAuthority(authority: any) {
    return this.http.post<any>(apiUrl, authority);
  }

  editAuthority(authority: any) {
    return this.http.put<any>(apiUrl + authority.id, authority);
  }

  getAuthorities(): Observable<any> {
    return this.http.get<any>(apiUrl + "all");
  }

  getAuthority(id): Observable<any> {
    return this.http.get<any>(apiUrl + id);
  }

  getAssignedAuthorities(id): Observable<any> {
    return this.http.get<any>(apiUrl + "assigned/" + id)
  }

  getUnAssignedAuthorities(id): Observable<any> {
    return this.http.get<any>(apiUrl + "un-assigned/" + id)
  }

}
