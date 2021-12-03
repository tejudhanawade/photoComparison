import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatPaginatorModule} from'@angular/material/paginator';
import{MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {PlatformModule} from '@angular/cdk/platform';

import { ListPhotosComponent } from './list-photos/list-photos.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPhotosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    PlatformModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
