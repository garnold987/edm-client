import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../app.service';
import { User } from '../user.model';
import { Role } from '../role.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  user: User;
  referenceRoles: Role[];
  addForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }
  
  private userApiUrl = 'http://localhost:8080/edm/api/users';
  
  ngOnInit() {
    
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [],
      roles: this.formBuilder.array([])
    });
    
    this.userService.getRoles().subscribe(data => {
      this.referenceRoles = data;
    });
    
  }
  
  
  gotoList() {
    this.router.navigate(['/user']);
  }
  
  onSubmit() {
    
    const roles = this.addForm.get('roles') as FormArray;
    
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
    
    this.userService.save(this.addForm.value)
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
    const roles = this.addForm.get('roles') as FormArray;

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