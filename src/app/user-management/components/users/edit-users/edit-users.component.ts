import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { UsersService } from 'src/app/services/users.service';
import { RoleService } from 'src/app/services/role.service';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  @Input() user;
  @Output() updatedUser = new EventEmitter();
  public userForm: FormGroup;
  public isAlert: boolean;
  public opened = true;
  public message: string;
  public editState = ClrLoadingState.DEFAULT;
  userRoles: any;

  constructor(private usersService: UsersService,
    private roleService :RoleService) {
  }

  ngOnInit() {
    this.createUserForm();
    this.initializeForm();
    this.getAllRoles();
  }

  private getAllRoles() {
    this.roleService.getRoles()
      .subscribe(data => {
        this.userRoles = data;
      })
  }

  private createUserForm() {
    this.userForm = new FormGroup({
      id: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      roleId: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
  }

  private initializeForm() {
    this.userForm.setValue({
      id: this.user.id,
      email: this.user.email,
      roleId: this.user.role.id,
      username: this.user.username
    });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }


  public editUser() {
    this.editState = ClrLoadingState.LOADING;
    console.log(this.userForm.value);
    this.usersService
      .editUser(this.userForm.value)
      .subscribe(res => {
        this.editState = ClrLoadingState.SUCCESS;
        this.onClose(res);
      }, (err) => {
        this.editState = ClrLoadingState.ERROR;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  public onClose(user) {
    this.updatedUser.emit(user);
  }

  public removeUnderscore(str: string) {
    return str.replace(/_/g, " ");
  }
}
