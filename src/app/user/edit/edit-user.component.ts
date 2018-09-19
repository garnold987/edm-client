import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../app.service';
import { User } from '../user.model';
import { Role } from '../role.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
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
      console.log("Invalid Action - No User Id Found");
      this.gotoList();
      return;
    }
    
    this.editForm = this.formBuilder.group({
      id: [],
      username: ["", [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      realname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      enabled: [""],
      roles: this.formBuilder.array([])
    });
    
    this.userService.get(userId).subscribe(data => {
      
      const formArray = this.editForm.get('roles') as FormArray;
      var rs = data['roles'];
      for(var i = 0; i < rs.length; i++) {
        formArray.push(new FormControl(rs[i]['id']));
      }
      this.editForm.controls.id.setValue(data['id']);
      this.editForm.controls.username.setValue(data['username']);
      this.editForm.controls.realname.setValue(data['name']);
      this.editForm.controls.email.setValue(data['email']);
      this.editForm.controls.password.setValue(data['password']);
      this.editForm.controls.enabled.setValue(data['enabled']);
      this.editForm.controls.roles = formArray;
    });
    
    this.userService.getRoles().subscribe(data => {
      this.referenceRoles = data;
    });
    
  }
  
  get username() { return this.editForm.get("username"); }
  get realname() { return this.editForm.get("realname"); }
  get email() { return this.editForm.get("email"); }
  get password() { return this.editForm.get("password"); }
  get enabled() { return this.editForm.get("enabled"); }
  get roles() { return this.editForm.get("roles"); }
  
  gotoList() {
    this.router.navigate(['/user']);
  }
  
  onSubmit() {
    
    const roles = this.editForm.get('roles') as FormArray;
    
    for(var i = 0; i < roles.length; i ++) {
      
      var id = roles.at(i).value;
      for(var x = 0; x < this.referenceRoles.length; x++) {
        var rr = this.referenceRoles[x];
        if(rr.id == id) {
          //Role Found
          roles.removeAt(i);
          roles.insert(i, new FormControl(rr));
          break;
        }
      }
      
    }
    
    this.userService.save(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.gotoList();
        }, 
        error => {
          console.log(error);
    });
  }
  
   onChange(event) {
    const roles = this.editForm.get('roles') as FormArray;

    if(event.srcElement.checked) {
      roles.push(new FormControl(parseInt(event.srcElement.value)));
    } 
    else {
      for(var i = 0; i < roles.controls.length; i++) {
        var role = roles.at(i);
        if(role.value == event.srcElement.value) {
          roles.removeAt(i);
        }
      }
    }
  }
}