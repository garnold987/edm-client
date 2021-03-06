import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {UserService} from '../app.service';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token.storage'

@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  
  constructor(private router: Router, private userService: UserService, private token: TokenStorage) {
  }
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }
  
  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(result => {
      this.ngOnInit();
    }, error => console.error(error))
  }
  
  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  }
  
  addUser(): void {
    this.router.navigate(['add-user']);
  }
}

