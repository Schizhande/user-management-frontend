import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  @Input() role :Role;
  @Output() updatedRole= new EventEmitter();
  public roleForm: FormGroup;
  public isAlert: boolean;
  public opened = true;
  public message: string;
  public editState = ClrLoadingState.DEFAULT;

 
  constructor(private roleService :RoleService) { }

  ngOnInit() {
    this.createRoleForm();
    this.initializeForm();
  }

  private createRoleForm() {
    this.roleForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  private initializeForm() {
    this.roleForm.setValue({
      id: this.role.id,
      name: this.role.name,
      description: this.role.description,
    });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }


  public editRole() {
    this.editState = ClrLoadingState.LOADING;
    console.log(this.roleForm.value);
    this.roleService
      .editRole(this.roleForm.value)
      .subscribe(res => {
        this.editState = ClrLoadingState.SUCCESS;
        this.onClose(res);
      }, (err) => {
        this.editState = ClrLoadingState.ERROR;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  public onClose(user) {
    this.updatedRole.emit(user);
  }

  public removeUnderscore(str: string) {
    return str.replace(/_/g, " ");
  }

}
