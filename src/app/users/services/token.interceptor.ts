import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.loggedInUser ? this.userService.loggedInUser.token : null;

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { 'x-access-token': `${token}` }
      });
    }
    return next.handle(request);
  }
}