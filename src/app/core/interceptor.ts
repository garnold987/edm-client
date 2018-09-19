import { AuthService } from "./auth.service";
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import {TokenStorage} from "./token.storage";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
//        console.log("Token: " + this.token.getToken());
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).do(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            console.log('req url :: ' + req.url);
            if (err.status === 401) {
              this.router.navigate(['user']);
            }
          }
        }
      );
  }
  
//  intercept(req, next) {
//      const authService = this.injector.get(AuthService);
//      const authRequest = req.clone({
//          // tslint:disable-next-line:max-line-length
//          headers: req.headers.set('Authorization', 'Bearer ' + authService.token)
//      });
//
//      return next.handle(authRequest);
//  }

}