import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private router : Router) {
  }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    }
    if(this.loginForm.controls.username.value == 'admin' && this.loginForm.controls.password.value == 'admin'){
      this.router.navigate(["user"]);
    }else {
      this.invalidLogin = true;
    }
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]      
    });
  }
}