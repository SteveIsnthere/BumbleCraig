import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  selfUserID = 2;
  selfUserName = "";
  isVisitor = true;
  sessionPassword = "";

  constructor(private cookieService: CookieService) {
    this.loadSelfUserInfo();
  }

  loadSelfUserInfo() {
    const userNameFromCookie = this.cookieService.get('selfUserName');
    const sessionPasswordFromCookie = this.cookieService.get('sessionPassword');
    if (userNameFromCookie && sessionPasswordFromCookie) {
      this.selfUserName = userNameFromCookie;
      this.sessionPassword = sessionPasswordFromCookie;
    }
  }

}
