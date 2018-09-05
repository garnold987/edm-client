import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "../user/user.component";
import {AddUserComponent} from "../user/add/add-user.component";
import {EditUserComponent} from "../user/edit/edit-user.component";
import {AccountComponent} from "../account/account.component";
import {LoginComponent} from "../login/login.component";

const routes: Routes = [
  { path: 'user', component: UserComponent},
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }