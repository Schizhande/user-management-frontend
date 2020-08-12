import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-enable-user',
  templateUrl: './enable-user.component.html',
  styleUrls: ['./enable-user.component.scss']
})
export class EnableUserComponent implements OnInit {

  @Input() user;
  @Output() enabledUser = new EventEmitter();
  public opened = true;
  public userForm: FormGroup;
  public addState = ClrLoadingState.DEFAULT;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.createUserForm();
    this.initializeForm();
  }

  private createUserForm() {
    this.userForm = new FormGroup({
      id: new FormControl('', Validators.required),
      enabled: new FormControl('', Validators.required)
    });
  }

  private initializeForm() {
    this.userForm.setValue({
      id: this.user.id,
      enabled: this.user.enabled
    });
  }

  enableUser() {
    this.user.enabled = this.userForm.controls['enabled'].value; 
    console.log(this.user.enabled);
  
    this.addState = ClrLoadingState.LOADING;
    this.userService
      .enableUser(this.user.id, this.user.enabled)
      .subscribe(data => {
        this.addState = ClrLoadingState.SUCCESS;
        this.onClose(data)
        console.log("enable success")
      }, (err) => {
        this.addState = ClrLoadingState.ERROR;
        console.log("enable fail")
      });
  }
  public onClose(user) {
    this.enabledUser.emit(user);
  }

}
