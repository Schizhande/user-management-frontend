import { Component, OnInit } from '@angular/core';
import { Authority } from 'src/app/models/authority';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthoritiesService } from 'src/app/services/authorities.service';

@Component({
  selector: 'app-list-authorities',
  templateUrl: './list-authorities.component.html',
  styleUrls: ['./list-authorities.component.scss']
})
export class ListAuthoritiesComponent implements OnInit {

  public loading = true;
  public authorities: any;
  public isEdit: boolean;
  public selectedAuthority: Authority;
  public placeholderMessage: string;

  constructor(private http: HttpClient,
    private authoritiesService: AuthoritiesService) { }

  ngOnInit() {
    this.authoritiesService.getAuthorities()
      .subscribe(data => {
        this.loading = false;
        this.authorities = data;
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

  public promptEdit(content) {
    this.isEdit = true;
    this.selectedAuthority = content;
  }

  public updateAuthority(event) {
    this.authorities.splice(this.authorities.indexOf(this.selectedAuthority), 1, event);
    this.isEdit = false;
  }

  public formatDate(date) {
    return date;
  }

  public removeUnderscore(str: string) {
    return str.replace(/_/g, " ");
  }


}
