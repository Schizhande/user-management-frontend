import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { AuthoritiesService } from 'src/app/services/authorities.service';
import { Authority } from 'src/app/models/authority';

@Component({
  selector: 'app-edit-authority',
  templateUrl: './edit-authority.component.html',
  styleUrls: ['./edit-authority.component.scss']
})
export class EditAuthorityComponent implements OnInit {


  @Input() authority: Authority;
  @Output() updatedAuthority = new EventEmitter();
  public authorityForm: FormGroup;
  public isAlert: boolean;
  public opened = true;
  public message: string;
  public editState = ClrLoadingState.DEFAULT;

  constructor(private authorityService: AuthoritiesService) {
  }

  ngOnInit() {
    this.createAuthorityForm();
    this.initializeForm();
  }

  private createAuthorityForm() {
    this.authorityForm = new FormGroup({
      id: new FormControl('', Validators.required),
      authority: new FormControl('', Validators.required),
      permissionDescription: new FormControl('', Validators.required),
    });
  }

  private initializeForm() {
    this.authorityForm.setValue({
      id: this.authority.id,
      permissionDescription: this.authority.description,
      authority: this.authority.authority
    });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }


  public editAuthority() {
    this.editState = ClrLoadingState.LOADING;
    console.log(this.authorityForm.value);
    this.authorityService
      .editAuthority(this.authorityForm.value)
      .subscribe(res => {
        this.editState = ClrLoadingState.SUCCESS;
        this.onClose(res);
      }, (err) => {
        this.editState = ClrLoadingState.ERROR;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  public onClose(user) {
    this.updatedAuthority.emit(user);
  }

  public removeUnderscore(str: string) {
    return str.replace(/_/g, " ");
  }

}
