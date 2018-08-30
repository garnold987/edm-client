import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../app.service';
import { User } from '../user.model';
import { Role } from '../role.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  user: User;
  referenceRoles: Role[];
  editForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }
  
  private userApiUrl = 'http://localhost:8080/edm/api/users';
  
  ngOnInit() {
    
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid Action.");
      this.gotoList();
      return;
    }
    
    this.editForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [],
      roles: []
    });
    
    this.userService.get(userId).subscribe(data => {
      console.log(data);
      this.editForm.setValue(data);
    });
    
    this.userService.getRoles().subscribe(data => {
      console.log("ROLES - " + JSON.stringify(data));
      this.referenceRoles = data;
    });
    
    
    console.log("this.referenceRoles => " + this.referenceRoles);
    console.log("editForm.value.roles => " + this.editForm.value.roles);
    
  }
  
  
  gotoList() {
    this.router.navigate(['/user']);
  }
  
  onSubmit() {
    this.userService.save(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.gotoList();
        }, 
        error => {
          alert(error);
          console.log(error);
        });
  }
  
}