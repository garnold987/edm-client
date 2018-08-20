import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {User} from './user.model';
import {UserService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns = ['username', 'password', 'enabled', 'roles', 'actions'];
  dataSource = new MatTableDataSource();
  users: Array<any>;
  deleteUrl: "http://localhost:8080/edm/users/";
  
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
        console.log(data);
        this.users = data;
        this.dataSource.data = data;
      }
    );
  }
  
  gotoList() {
    this.router.navigate(['/user']);
  }
  
  remove(href) {
    console.log(href);
    this.userService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }
}

