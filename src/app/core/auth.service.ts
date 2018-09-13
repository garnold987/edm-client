import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";


export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  private url: string = 'http://localhost:8080/edm/api/auth';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

    get token() {
        return localStorage.getItem(TOKEN_NAME);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(TOKEN_NAME);
    }

    logout() {
        localStorage.removeItem(TOKEN_NAME);
        this.router.navigateByUrl('/');
    }

    login(username: string, pass: string) {
        const headers = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
        };

        const data = {
            username: username,
            password: pass
        };

        this.http.post(this.url + '/signin', data, headers).subscribe(
            (res: any) => {
                localStorage.setItem(TOKEN_NAME, res.accessToken);
                this.router.navigate(['/user']);
            }
        );
    }
}
  
//import { Http, Response, Headers } from '@angular/http';
  
//  constructor(private http: Http) { }


//  login(user) {
//    this.http
//      .post(`${this.url}/signin`, JSON.stringify(user), { headers: this.headers })
//      .toPromise()
//      .then(data => {
//        localStorage.setItem(TOKEN_NAME, data.json().accessToken);
//      })
//      .catch(err => {
//                return Promise.reject(err.json().error  || 'Server error');
//            });
//  }