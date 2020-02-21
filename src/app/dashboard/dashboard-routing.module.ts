import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { ListUsersComponent } from '../user-management/components/users/list-users/list-users.component';
import { ViewUsersComponent } from '../user-management/components/users/view-users/view-users.component';
import { ListRolesComponent } from '../user-management/components/groups/list-roles/list-roles.component';
import { ListAuthoritiesComponent } from '../user-management/components/authorities/list-authorities/list-authorities.component';
import { AuthGuardService } from '../auth/guards/auth-guard.service';

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

      },

      {
        path: 'users/:id',
        component: ViewUsersComponent,
        pathMatch: 'full'
      },

      {
        path: 'roles',
        component: ListRolesComponent,
        pathMatch: 'full'
      },

      {
        path: "authorities",
        component: ListAuthoritiesComponent,
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
