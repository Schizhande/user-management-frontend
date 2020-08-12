import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-authorities',
  templateUrl: './display-authorities.component.html',
  styleUrls: ['./display-authorities.component.scss']
})
export class DisplayAuthoritiesComponent implements OnInit {

  @Input() unAssignedAuthorities:any;
  private authoritiesA: any;
  constructor() { }

  ngOnInit() {
    console.log("in display")
    console.log(this.unAssignedAuthorities)
    this.authoritiesA = this.unAssignedAuthorities;
  }

}
