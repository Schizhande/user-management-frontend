import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  sub: Subscription;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const token = params['token'];
      let verifyTokenObject ={
        token: token
      }
      console.log(token);
      if (token) {
        this.userService.verifyUser(verifyTokenObject).subscribe((user: any) => {
          if (user) {
            console.log(user);
            this.router.navigate(['home/user-profile'])
          } else {
            console.log(`token not found`);
          }
        });
      }
    });
  }

}
