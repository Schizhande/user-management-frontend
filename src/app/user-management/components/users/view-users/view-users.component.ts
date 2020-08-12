import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  sub: Subscription;
  user: User;
  isAlert:boolean;
  companyId: number;
  enable: boolean;
  message:String;
  public addState = ClrLoadingState.DEFAULT;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      if (id) {
        this.userService.getUser(id).subscribe((user: any) => {
          if (user) {
            console.log(user);
            this.user = user;
          } else {
            console.log(`user with id '${id}' not found, returning to list`);
          }
        });
      }
    });
  }

  enableUser(id: any, anable: any) {
      console.log(id +' '+ anable)
      this.addState = ClrLoadingState.DEFAULT;
      this.userService
      .enableUser(id, anable)
      .subscribe(data => {
        this.addState = ClrLoadingState.SUCCESS;
        this.displayAlert("User enable or disable was successful");
        this.user = data
      }, (err) => {
        this.addState = ClrLoadingState.ERROR;
        this.displayAlert(err.error.message ? err.error.message : 'An error has occurred');
      });
  }

  private displayAlert(displayMessage: string) {
    this.isAlert = true;
    this.message = displayMessage;
  }

  
  public viewRoles() {
    this.router.navigate(['home/users']);
  }


}
