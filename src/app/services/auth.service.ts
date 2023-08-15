import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {apiEndPoint} from "../env";
import {HttpClient} from "@angular/common/http";
import {AuthDataService} from "./auth-data.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  selfUserID = 0;
  isVisitor = true;

  constructor(private cookieService: CookieService, private http: HttpClient, private authData: AuthDataService, private router: Router) {
    console.log("AuthService constructor");
    if (!this.haveSessionPasswordSaved()) {
      this.switchToLoginView()
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

  switchToLoginView() {
    this.router.navigate(["login"]).then();
  }

  loginUsingSessionPassword() {
    this.http.get<number>(apiEndPoint + '/auth/verify_session').subscribe((data) => {
      this.selfUserID = data;
      this.loggedIn = true;
      this.http.get<boolean>(apiEndPoint + '/user/is_visitor/' + this.selfUserID).subscribe((data) => {
        this.isVisitor = data;
      });
      const dateNow = new Date();
      dateNow.setDate(dateNow.getDate() + 7);
      this.cookieService.set('sessionPassword', this.authData.sessionPassword, dateNow);
      console.log(this.selfUserID);
      console.log(this.authData.sessionPassword);
      this.router.navigate(["home"]).then();
    });
  }
}
