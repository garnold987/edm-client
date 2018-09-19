import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token.storage'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    constructor(private router: Router, private token : TokenStorage) {
    }
    
    logout() {
        this.token.signOut();
        this.router.navigate(['logout']);
    }
}
