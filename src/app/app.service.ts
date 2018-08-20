import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user/user.model';
import {Account} from './account/account.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) {}
  
  private userApiUrl = 'http://localhost:8080/edm/api/users';
  private userUrl = "http://localhost:8080/edm/users"
  private roleUrl = 'http://localhost:8080/edm/api/roles';
  
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }
  
  public get(id: string) {
    return this.http.get(this.userUrl + "/" + id);
  }
  
  public save(user: any): Observable<any> {
    let result: Observable<Object>;
    if (user['href'] == null) {
      console.log("ADDING - ");
      console.log(user);
      result = this.http.post(this.userUrl, user);
    }
    else {
      console.log("EDITING");
      console.log(user);
      result = this.http.put(user.href, user);
    }
    return result;
  }
  
  public remove(href: string) {
    return this.http.delete(href);
  }
  
  public getRoles(): Observable<User[]> {
    return this.http.get<User[]>(this.roleUrl);
  }
  
  public getRole(id: string) {
    return this.http.get(this.roleUrl + "/" + id);
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