import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private previousUrl: string;
  private currentUrl: string;


  constructor(private authService: AuthService,
    private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  ngOnInit() {
  }

  logout() {
    // this.authService.logout();
    sessionStorage.clear();
    this.router.navigate(['auth/login'], {
      queryParams: {
        returnUrl: this.previousUrl
      }
    });
  }

}
