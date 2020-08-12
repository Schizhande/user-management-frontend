import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUsersComponent } from './components/users/view-users/view-users.component';
import { ListRolesComponent } from './components/groups/list-roles/list-roles.component';
import { ListAuthoritiesComponent } from './components/authorities/list-authorities/list-authorities.component';
import { EditAuthorityComponent } from './components/authorities/edit-authority/edit-authority.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { AddRoleComponent } from './components/groups/add-role/add-role.component';
import { EditRoleComponent } from './components/groups/edit-role/edit-role.component';
import { EditUserInformationComponent } from './components/user-infor/edit-user-information/edit-user-information.component';
import { VerifyUserComponent } from './components/users/verify-user/verify-user.component';
import { EnableUserComponent } from './components/users/enable-user/enable-user.component';
import { ViewGroupComponent } from './components/groups/view-group/view-group.component';
import { DisplayAuthoritiesComponent } from './components/authorities/display-authorities/display-authorities.component';




@NgModule({
  declarations: [
    ListUsersComponent,
    AddUsersComponent,
    EditUsersComponent,
    ViewUsersComponent,
    ListRolesComponent,
    ListAuthoritiesComponent,
    EditAuthorityComponent,
    AddRoleComponent,
    EditRoleComponent,
    EditUserInformationComponent,
    VerifyUserComponent,
    EnableUserComponent,
    ViewGroupComponent,
    DisplayAuthoritiesComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  exports: [
    ListUsersComponent,
    AddUsersComponent,
    EditUsersComponent,
    ViewUsersComponent,
    ListRolesComponent,
    ListAuthoritiesComponent,
    EditAuthorityComponent
  ] 
})
export class UserManagementModule { }
