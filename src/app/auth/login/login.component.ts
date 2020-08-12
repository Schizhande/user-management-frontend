import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isAlert: boolean;
  public placeholderMessage: String;
  public returnUrl: string = '';
  public loginState = ClrLoadingState.DEFAULT;

  constructor(private _router: Router, private _http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => this.returnUrl = params['returnUrl'] || 'home')
    sessionStorage.clear();
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public login() {
    this.loginState = ClrLoadingState.LOADING;
    let params = new URLSearchParams();
    params.append('username', this.loginForm.value.username);
    params.append('password', this.loginForm.value.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'mobile');
    let headers =
      new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa("mobile:pin")
      });

    this._http.post<any>('http://localhost:8087/oauth/token',
      params.toString(), { headers: headers })
      .subscribe(data => {
        console.log(data);
        sessionStorage.setItem('token', data.access_token);
        this._router.navigateByUrl(this.returnUrl);
        this.loginState = ClrLoadingState.SUCCESS
      },
        err => {
          this.loginState = ClrLoadingState.ERROR
          this.isAlert = true;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'Invalid user name or password ';
        })
  };  
}
