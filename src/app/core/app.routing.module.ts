import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "../user/user.component";
import {AddUserComponent} from "../user/add/add-user.component";
import {EditUserComponent} from "../user/edit/edit-user.component";
import {AccountComponent} from "../account/account.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuard} from "./auth.guard";
import {RoleGuard} from "./role.guard";

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'add-user', component: AddUserComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_ADMIN", "ROLE_MANAGER"]} },
  { path: 'edit-user', component: EditUserComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_ADMIN", "ROLE_MANAGER"]} },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent},
  { path: '**', redirectTo: '' }
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