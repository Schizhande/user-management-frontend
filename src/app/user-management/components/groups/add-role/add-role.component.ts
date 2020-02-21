import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  @Output() isAddSuccess = new EventEmitter();
  @Output() addedRole = new EventEmitter();
  public roleForm: FormGroup;
  public isAlert: boolean;
  public isAdd: boolean;
  public message: string;
  public addState = ClrLoadingState.DEFAULT;

  constructor( private roleService : RoleService) {
  }
  ngOnInit() {
    this.createRoleForm();
  }

  private createRoleForm() {
    this.roleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }

  public promptAdd() {
    this.roleForm.reset();
    this.isAlert = false;
    this.isAdd = true;
  }

  public addRole() {
    this.addState = ClrLoadingState.DEFAULT;
    this.roleService
      .createRole(this.roleForm.value)
      .subscribe(data => {
        this.addState = ClrLoadingState.SUCCESS;
        this.isAdd = false;
        this.onClose(true);
        console.log(data)
        this.emitRole(data);
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

  private emitRole(role: Role){
    console.log(role);
    this.addedRole.emit(role);
  }


}
