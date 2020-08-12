import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/role.service';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  @Output() isAddSuccess = new EventEmitter();
  @Output() addedUser = new EventEmitter();
  public userForm: FormGroup;
  public isAlert: boolean;
  public isAdd: boolean;
  public message: string;
  public addState = ClrLoadingState.DEFAULT;
  public userRoles: any;


  constructor(private usersService: UsersService, private roleService : RoleService) {
  
  }

  ngOnInit() {
    this.createUserForm();
    this.getAllRoles();
  }

  private createUserForm() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      roleId: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
  }

  private getAllRoles() {
    this.roleService.getRoles()
      .subscribe(data => {
        this.userRoles = data;
      })
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }

  public promptAdd() {
    this.userForm.reset();
    this.isAlert = false;
    this.isAdd = true;
  }

  public addUser() {
    this.addState = ClrLoadingState.LOADING;
    this.usersService
      .createUser(this.userForm.value)
      .subscribe(data => {
        this.addState = ClrLoadingState.SUCCESS;
        this.isAdd = false;
        this.onClose(true);
        console.log(data)
        this.emitUser(data);
      }, (err) => {
        this.addState = ClrLoadingState.ERROR;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  public removeUnderscore(str: string) {
    return str.replace(/_/g, " ");
  }

  private onClose(isAdd: boolean){
    this.isAddSuccess.emit(isAdd);
  }

  private emitUser(user: User){
    console.log(user);
    this.addedUser.emit(user);
  }

}
