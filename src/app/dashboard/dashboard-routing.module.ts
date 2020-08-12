import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { ListUsersComponent } from '../user-management/components/users/list-users/list-users.component';
import { ViewUsersComponent } from '../user-management/components/users/view-users/view-users.component';
import { ListRolesComponent } from '../user-management/components/groups/list-roles/list-roles.component';
import { ListAuthoritiesComponent } from '../user-management/components/authorities/list-authorities/list-authorities.component';
import { AuthGuardService } from '../auth/guards/auth-guard.service';
import { EditUserInformationComponent } from '../user-management/components/user-infor/edit-user-information/edit-user-information.component';
import { VerifyUserComponent } from '../user-management/components/users/verify-user/verify-user.component';
import { ViewGroupComponent } from '../user-management/components/groups/view-group/view-group.component';

const dashboardRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DefaultPageComponent,
      },
      {
        path: 'users',
        canActivate: [AuthGuardService],
        component: ListUsersComponent,
        pathMatch:'full'

      },

      {
        path: 'users/:id',
        canActivate: [AuthGuardService],
        component: ViewUsersComponent,
        pathMatch: 'full'
      },

      {
        path: 'roles',
        canActivate: [AuthGuardService],
        component: ListRolesComponent,
        pathMatch: 'full'
      },

      {
        path: 'roles/:id',
        canActivate: [AuthGuardService],
        component: ViewGroupComponent,
        pathMatch: 'full'
      },

      {
        path: "authorities",
        canActivate: [AuthGuardService],
        component: ListAuthoritiesComponent,
        pathMatch: "full"
      },

      {
        path: "user-profile",
        canActivate: [AuthGuardService],
        component: EditUserInformationComponent,
        pathMatch: "full"
      },

      {
        path: "verify-user/:token",
        canActivate: [AuthGuardService],
        component: VerifyUserComponent,
        pathMatch: "full"
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(dashboardRoutes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
