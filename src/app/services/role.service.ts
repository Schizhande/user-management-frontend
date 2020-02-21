import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:8089/v1/'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public roles: Role[];

  constructor(private http: HttpClient) { }

  createRole(role: any) {
    return this.http.post<any>(apiUrl + 'roles', role);
  }

  editRole(role: any) {
    console.log(role)
    return this.http.put<any>(apiUrl + 'roles/' + role.id, role);
  }

  getRoles() : Observable<any> {
    return this.http.get<any>(apiUrl + 'roles/all');
  }

  getRole(id) : Observable<any> {
    return this.http.get<any>(apiUrl + 'roles/'+ id);
  }

}
