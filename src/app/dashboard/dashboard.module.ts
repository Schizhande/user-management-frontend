import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DefaultPageComponent } from './default-page/default-page.component';
import { HomeComponent } from './home/home.component';
import { ClarityModule } from '@clr/angular';




@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    DefaultPageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ClarityModule,
  ]
})
export class DashboardModule { }
