import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isAlert: boolean;
  public placeholderMessage: String;

  constructor(private _router: Router, private _http: HttpClient) { }

  ngOnInit() {
    localStorage.clear();
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public login() {

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

    this._http.post<any>('http://localhost:8089/oauth/token',
      params.toString(), { headers: headers })
      .subscribe(data => {
        console.log(data);
        localStorage.setItem('token', data.access_token);
        this._router.navigate(['']);
      },
        err => {
          this.isAlert = true;
          this.placeholderMessage = err.error.message
            ? err.error.message
            : 'Invalid user name or password ';
        })
  };
}
