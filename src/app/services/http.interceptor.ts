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
import {AuthService} from "./auth.service";

@Injectable()
export class Auth implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      // headers: new HttpHeaders({
      //   'name': this.auth.selfUserName,
      //   'sessionPassword': this.auth.sessionPassword,
      // })
      headers: new HttpHeaders({
        'name': 'test',
        'sessionPassword': 'test',
      })

    });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(["login"]).then();
          console.error("Unauthorized");
        }
        return throwError(error);
      })
    );
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: Auth, multi: true},
];
