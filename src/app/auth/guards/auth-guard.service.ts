import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> | boolean | Promise<boolean> {
    const url: string = state.url;

    if (this.authService.isAuthenticated()) {
      return true;
    }

    this._router.navigate(['auth/login']);
    return false;
  }
}
