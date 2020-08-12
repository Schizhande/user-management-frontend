import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {

  public loading = true;
  public roles: any;
  public isEdit: boolean;
  public isStatusChange: boolean;
  public selectedRole: Role;
  public placeholderMessage: string;
  public isAddSuccess: boolean;

  constructor(private http: HttpClient,
    private router: Router,
    private rolesService: RoleService) { }

  ngOnInit() {
    this.rolesService.getRoles()
      .subscribe(data => {
        this.loading = false;
        this.roles = data;
      },
        err => {
          this.loading = false;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'An error occurred whilst fetching Roles ';
        }
      );

  }

  public promptEdit(content) {
    this.isEdit = true;
    this.selectedRole = content;
  }

  public promptChangeActivationStatus(content) {
    this.isStatusChange = true;
    this.selectedRole = content;
  }

  public updateRole(event) {
    this.roles.splice(this.roles.indexOf(this.selectedRole), 1, event);
    this.isEdit = false;
  }

  public viewRole(id) {
    this.router.navigate(['home/roles/' + id]);
  }

  public addSuccess(event) {
    this.isAddSuccess = event;
    this.placeholderMessage = 'New Role successfully added';
  }

  public formatDate(date) {
    return date;
  }

  public addRole(event) {
    console.log(event);
    this.roles.push(event);
  }

}
