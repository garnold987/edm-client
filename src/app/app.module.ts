import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CustomMaterialModule} from "./core/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/edit/edit-user.component';
import { AccountComponent } from './account/account.component';
import {AppRoutingModule} from "./core/app.routing.module";
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './app.service';
import {AccountService} from './app.service';
import {ErrorDialogComponent} from './core/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    UserComponent,
    UserEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
   providers: [UserService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }