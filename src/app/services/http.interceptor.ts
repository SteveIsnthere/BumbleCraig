import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {AuthDataService} from "./auth-data.service";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class Auth implements HttpInterceptor {
  constructor(private authData: AuthDataService, private router: Router, private cookieService: CookieService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: new HttpHeaders({
        'sessionPassword': this.authData.sessionPassword,
      })
    });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.router.navigate(["login"]).then();
          console.error("damn you hacker! unauthorized access detected!");
          localStorage.clear()
          this.cookieService.delete('sessionPassword');
          this.authData.fireShouldLoginAsVisitorEvent();
        }
        return throwError(error);
      })
    );
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: Auth, multi: true},
];
