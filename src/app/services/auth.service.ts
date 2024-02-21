import {EventEmitter, Injectable, Output} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {apiEndPoint} from "../env";
import {HttpClient} from "@angular/common/http";
import {AuthDataService} from "./auth-data.service";
import {Router} from "@angular/router";
import {StatesService} from "./states.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  selfUserID = 0;
  isVisitor = true;

  @Output() loginEvent = new EventEmitter<string>()

  // constructor(private cookieService: CookieService, private http: HttpClient, private authData: AuthDataService, private router: Router, private states: StatesService) {
  //   if (!this.haveSessionPasswordSaved()) {
  //     this.switchToLoginView()
  //   } else {
  //     this.loginUsingSessionPassword();
  //   }
  // }
  //
  // haveSessionPasswordSaved() {
  //   const sessionPasswordFromCookie = this.cookieService.get('sessionPassword');
  //   if (sessionPasswordFromCookie) {
  //     this.authData.sessionPassword = sessionPasswordFromCookie;
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  //
  // logout() {
  //   this.loggedIn = false;
  //   this.cookieService.delete('sessionPassword');
  //   localStorage.clear();
  //   this.states.loadedUp = false;
  //   this.switchToLoginView();
  // }
  //
  // switchToLoginView() {
  //   this.router.navigate(["login"]).then();
  // }
  //
  // loginUsingSessionPassword(newUser = false) {
  //   this.http.get<number>(apiEndPoint + '/auth/verify_session').subscribe((data) => {
  //     this.selfUserID = data;
  //     this.loggedIn = true;
  //     if (!newUser) {
  //       this.isVisitor = false;
  //     }
  //     this.http.get<boolean>(apiEndPoint + '/user/is_visitor/' + this.selfUserID).subscribe((data) => {
  //       if (data !== this.isVisitor) this.isVisitor = data;
  //     });
  //     const expirationDate = new Date();
  //     expirationDate.setDate(expirationDate.getDate() + 5);
  //     this.cookieService.set('sessionPassword', this.authData.sessionPassword, expirationDate);
  //     this.loginEvent.emit("login");
  //     this.router.navigate(["home"]).then();
  //   });
  // }

  constructor(private cookieService: CookieService, private http: HttpClient, private authData: AuthDataService, private router: Router, private states: StatesService) {
    this.authData.shouldLoginAsVisitorEvent.subscribe(() => {
      this.continueAsVisitor()
    })

    if (!this.haveSessionPasswordSaved()) {
      this.continueAsVisitor()
    } else {
      this.loginUsingSessionPassword();
    }
  }

  haveSessionPasswordSaved() {
    const sessionPasswordFromCookie = this.cookieService.get('sessionPassword');
    if (sessionPasswordFromCookie) {
      this.authData.sessionPassword = sessionPasswordFromCookie;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.loggedIn = false;
    this.cookieService.delete('sessionPassword');
    localStorage.clear();
    this.states.loadedUp = false;
    this.continueAsVisitor();
  }

  continueAsVisitor() {
    localStorage.clear()
    this.http.get<number>(apiEndPoint + '/auth/login_as_new_user').subscribe((data) => {
      this.authData.sessionPassword = data.toString();
      this.loginUsingSessionPassword(true)
    })
  }

  loginUsingSessionPassword(newUser = false) {
    this.http.get<number>(apiEndPoint + '/auth/verify_session').subscribe((data) => {
      this.selfUserID = data;
      this.loggedIn = true;
      if (!newUser) {
        this.isVisitor = false;
      }
      this.http.get<boolean>(apiEndPoint + '/user/is_visitor/' + this.selfUserID).subscribe((data) => {
        if (data !== this.isVisitor) this.isVisitor = data;
      });
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 5);
      this.cookieService.set('sessionPassword', this.authData.sessionPassword, expirationDate);
      this.loginEvent.emit("login");
      this.router.navigate(["home"]).then();
    });
  }
}
