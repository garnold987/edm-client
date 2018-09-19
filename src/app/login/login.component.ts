import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth.service';
import { TokenStorage } from "../core/token.storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private token: TokenStorage) {
  }
  
   ngOnInit() {
    
    this.token.signOut();
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  get username() { return this.loginForm.get("username"); }
  get password() { return this.loginForm.get("password"); }

  login(): void {
    
    this.authService.attemptAuth(this.username.value, this.password.value).subscribe(
      data => {
        this.token.saveToken(data.accessToken);
        this.token.saveLoggedInUser(data.loggedInUser);
        this.router.navigate(['/user']);
      }
    );
  }

}