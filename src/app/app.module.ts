import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from "./core/app.routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './user/edit/edit-user.component';
import { AccountComponent } from './account/account.component';



import {UserService} from './app.service';
import {AccountService} from './app.service';
import {ErrorDialogComponent} from './core/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    UserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }