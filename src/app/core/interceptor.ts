import { AuthService } from "./auth.service";
import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
      const authService = this.injector.get(AuthService);
      const authRequest = req.clone({
          // tslint:disable-next-line:max-line-length
          headers: req.headers.set('Authorization', 'Bearer ' + authService.token)
      });

      return next.handle(authRequest);
  }

}