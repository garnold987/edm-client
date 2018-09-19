import { Injectable } from '@angular/core';


const TOKEN_KEY = 'jwt-token';

@Injectable()
export class TokenStorage {

  constructor() { }
  
  public currentUser: any;
  
  signOut() {
    this.currentUser = null;
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  
  public saveLoggedInUser(user: any) {
    this.currentUser = user;
    window.sessionStorage.setItem("LoggedInUser", JSON.stringify(user));
  }
  
  public getLoggedInUser(): any {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("LoggedInUser"));
    return JSON.parse(window.sessionStorage.getItem("LoggedInUser"));
  }
  
  public authenticated(): boolean {
      return !!this.currentUser;
  }
  
  public hasRole(role: string): boolean {
    if(this.currentUser != null) {
        for(var i=0; i < this.currentUser.roles.length; i++) {
            if(this.currentUser.roles[i].name === role) {
                return true;
            }
        }
        return false;
    }
  }
}