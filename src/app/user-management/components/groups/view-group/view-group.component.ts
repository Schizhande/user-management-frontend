import { Component, OnInit } from '@angular/core';
import { AuthoritiesService } from 'src/app/services/authorities.service';
import { Authority } from 'src/app/models/authority';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {

  sub: Subscription;
  public loading = true;
  public isEdit: boolean;
  public placeholderMessage: string;
  selectedUnAssignedAuthorities = [];
  selectedAssignedAuthorities = [];
  public unAssignedAuthorities: any;
  public assignedAuthorities: any;
  private group: Role;
  private selectedAuthority: Authority;

  constructor(private authoritiesService: AuthoritiesService,
    private route: ActivatedRoute,
    private roleService: RoleService) { }

  ngOnInit() {
    this.refreshAuthorities();
  }

  getRole(id) {
    this.roleService.getRole(id)
      .subscribe(data => {
        this.loading = false;
        this.group = data;
        console.log(data);
      },
        err => {
          this.loading = false;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'An error occurred whilst fetching authorities ';
        }
      );
  }
  getAssignedAuthorities(id) {

    this.authoritiesService.getAssignedAuthorities(id)
      .subscribe(data => {
        this.loading = false;
        this.assignedAuthorities = data;
        console.log(data);
      },
        err => {
          this.loading = false;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'An error occurred whilst fetching authorities ';
        }
      );
  }

  getUnAssignedAuthorities(id) {
    this.authoritiesService.getUnAssignedAuthorities(id)
      .subscribe(data => {
        this.loading = false;
        this.unAssignedAuthorities = data;
        console.log(data);
      },
        err => {
          this.loading = false;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'An error occurred whilst fetching authorities ';
        }
      );
  }

  public assignAuthority() {
    let temp = [];
    this.selectedUnAssignedAuthorities.forEach(authority => temp.push(authority.id))
    let request = {
      authoritiesId: temp,
      groupId: this.group.id
    }
    console.log(request);

    this.roleService.assignPermissions(request)
      .subscribe(data => {
        this.loading = false;
        this.assignedAuthorities = data;
        this.refreshAuthorities();
      },
        err => {
          this.loading = false;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'An error occurred whilst fetching authorities ';
        }
      );
  }

  private refreshAuthorities() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getAssignedAuthorities(id);
        this.getUnAssignedAuthorities(id);
        this.getRole(id);
      }
    });
  }

  public unAssignAuthority() {
    let temp = [];
    this.selectedAssignedAuthorities.forEach(authority => temp.push(authority.id))
    let request = {
      authoritiesId: temp,
      groupId: this.group.id
    }
    console.log(request);

    this.roleService.unAssignPermissions(request)
      .subscribe(data => {
        this.loading = false;
        this.assignedAuthorities = data;
        this.refreshAuthorities();
      },
        err => {
          this.loading = false;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'An error occurred whilst fetching authorities ';
        }
      );
  }

  public removeUnderscore(str: string) {
    return str.replace(/_/g, " ");
  }

  public promptEdit(content) {
    this.isEdit = true;
    this.selectedAuthority = content;
  }

  public updateAuthority(event) {
    // this.authorities.splice(this.authorities.indexOf(this.selectedAuthority), 1, event);
    this.isEdit = false;
    this.refreshAuthorities();
  }

}
