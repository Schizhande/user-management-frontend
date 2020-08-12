import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserInformation } from 'src/app/models/user-information';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-edit-user-information',
  templateUrl: './edit-user-information.component.html',
  styleUrls: ['./edit-user-information.component.scss']
})
export class EditUserInformationComponent implements OnInit {

  public user: User;
  public userInfoForm: FormGroup;
  public editState = ClrLoadingState.DEFAULT;
  public placeholderMessage: string;
  public isAlert: boolean;
  public isAddSuccess: boolean;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.createUserInformationForm();
    this.getUserInformation();
  }

  private getUserInformation() {
    this.userService.getUserInformation()
      .subscribe(data => {
        this.user = data;
        this.initializeForm(data);
        console.log(data);
      }, (err) => {
        alert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  private createUserInformationForm() {
    this.userInfoForm = new FormGroup({
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      username: new FormControl({ value: '', disabled: true }, Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormGroup({
        homeAddress: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postalAddress: new FormControl('', Validators.required)
      })
    })
  }

  private initializeForm(user: any) {
    this.userInfoForm.patchValue({
      username: user.username,
      email:user.email,
    });
    if (user.userInformation != null) {
      this.userInfoForm.patchValue({
        firstName: user.userInformation.firstName,
        lastName: user.userInformation.lastName,
        phoneNumber: user.userInformation.phoneNumber,

      });
      if (user.userInformation.address != null) {
        this.userInfoForm.patchValue({
          address: {
            homeAddress: user.userInformation.address.homeAddress,
            state: user.userInformation.address.state,
            country: user.userInformation.address.country,
            city: user.userInformation.address.city,
            postalAddress: user.userInformation.address.postalAddress
          }
        });
      }
    }
  }

  editUser() {
    this.editState = ClrLoadingState.LOADING;
    this.userService
      .editUserInformation(this.userInfoForm.value)
      .subscribe(res => {
        this.editState = ClrLoadingState.SUCCESS;
        this.isAddSuccess = true;
        this.displayAlert("User information successfully updated")
      }, (err) => {
        this.editState = ClrLoadingState.ERROR;
        this.isAlert = true;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  private displayAlert(displayMessage: string) {
    this.placeholderMessage = displayMessage;
  }
}
