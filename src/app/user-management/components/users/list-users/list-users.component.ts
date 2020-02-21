import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public loading = true;
  public users: any;
  public isEdit: boolean;
  public isStatusChange: boolean;
  public selectedUser: User;
  public placeholderMessage: string;
  public isAddSuccess: boolean;

  constructor(private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(data => {
        this.loading = false;
        this.users = data;
      },
        err => {
          this.loading = false;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'An error occurred whilst fetching users ';
        }
      );

  }

  public promptEdit(content) {
    this.isEdit = true;
    this.selectedUser = content;
  }

  public promptChangeActivationStatus(content) {
    this.isStatusChange = true;
    this.selectedUser = content;
  }

  public updateUser(event) {
    this.users.splice(this.users.indexOf(this.selectedUser), 1, event);
    this.isEdit = false;
  }

  public viewUser(id) {
    this.router.navigate(['home/users/' + id]);
  }

  public addSuccess(event) {
    this.isAddSuccess = event;
    this.placeholderMessage = 'New user successfully added';
  }

  public formatDate(date) {
    return date;
  }

  public addUser(event) {
    console.log(event);
    this.users.push(event);
  }
}
