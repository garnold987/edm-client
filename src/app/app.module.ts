import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from "./core/app.routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {AuthService} from './core/auth.service';
import {Interceptor} from './core/interceptor';
import {AuthGuard} from './core/auth.guard';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './user/edit/edit-user.component';
import { AddUserComponent } from './user/add/add-user.component';
import { AccountComponent } from './account/account.component';

import {UserService} from './app.service';
import {AccountService} from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [UserService, AccountService, AuthService, AuthGuard,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }