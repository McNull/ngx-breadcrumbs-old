
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';
import { BrowseComponent } from "./browse.component";
import { HomeComponent } from "./home.component";

import { routes } from './app.routes';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    McBreadcrumbsModule
  ],
  declarations: [AppComponent, AboutComponent, BrowseComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
