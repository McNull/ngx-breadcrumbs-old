import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LibModule } from 'quickstart-lib';

import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';
import { BrowseComponent } from "app/browse.component";
import { HomeComponent } from "app/home.component";

import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    LibModule
  ],
  declarations: [AppComponent, AboutComponent, BrowseComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
