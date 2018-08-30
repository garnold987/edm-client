import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user/user.model';
import {Role} from './user/role.model';
import {Account} from './account/account.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) {}
  
  private userApiUrl = 'http://localhost:8080/edm/api/users';
  private userUrl = 'http://localhost:8080/edm/users';
  private roleApiUrl = 'http://localhost:8080/edm/api/roles';
  private roleUrl = 'http://localhost:8080/edm/roles/';
  
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }
  
  public get(id: string) {
    return this.http.get(this.userApiUrl + "/" + id);
  }
  
  public save(user: any): Observable<any> {
    let result: Observable<Object>;
    
    if (user.id) {
      console.log("EDITING");
      console.log(user);
      result = this.http.put(this.userApiUrl + "/" + user.id, user);
    }
    else {
      console.log("ADDING - ");
      console.log(user);
      result = this.http.post(this.userApiUrl, user);
    }
    return result;
  }
  
  public remove(href: string) {
    return this.http.delete(href);
  }
  
  public deleteUser(user: User) {
    return this.http.delete(this.userUrl + "/" + user.id);
  }
  
  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleApiUrl);
  }
    
  public getUserRoles(id: string) {
    return this.http.get(this.userApiUrl+"/" + id + "/roles");
  }
  
  public getRole(id: string) {
    return this.http.get(this.roleApiUrl + "/" + id);
  }
}

@Injectable()
export class AccountService {
  
  constructor(private http: HttpClient) {}
  
  private accountUrl = 'http://localhost:8080/edm/api/accounts';
  
  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl);
  }
}