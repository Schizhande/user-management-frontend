import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './user-management/components/users/list-users/list-users.component';
import { ViewUsersComponent } from './user-management/components/users/view-users/view-users.component';
import { ListRolesComponent } from './user-management/components/groups/list-roles/list-roles.component';
import { ListAuthoritiesComponent } from './user-management/components/authorities/list-authorities/list-authorities.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: "home",
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
