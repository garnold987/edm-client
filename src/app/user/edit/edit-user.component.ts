import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  
  user: any = {};
  
  roles: Array<any>;
  
  sub: Subscription;
  
  constructor(private route: ActivatedRoute,
              private router: Router, 
              private userService: UserService) {
  }
  
  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.userService.getRoles().subscribe(
        data => {
          console.log(data);
          this.roles = data;
        }
      );
      if (id) {
        this.userService.get(id).subscribe((user: any) => {
          if(user) {
            this.user = user;
            console.log(this.user);
            console.log(this);
            this.user.href = user._links.self.href;
          }
          else {
            console.log(`User with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  gotoList() {
    this.router.navigate(['/user']);
  }
  
  save(form: NgForm) {
    console.log(JSON.stringify(form));
    this.userService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }
  
  remove(href) {
    console.log(href);
    this.userService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }
}