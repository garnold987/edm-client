import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {TokenStorage} from "./token.storage";
import { Observable } from "rxjs";

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  private url: string = 'http://localhost:8080/edm/api/auth';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private token: TokenStorage) { }


    logout() {
        this.token.signOut();
        this.router.navigateByUrl('/');
    }
  
    attemptAuth(username: string, password: string): Observable<any> {
      
      const credentials = {username: username, password: password};
      return this.http.post(this.url + "/signin", credentials);
    }
  
    
  
}