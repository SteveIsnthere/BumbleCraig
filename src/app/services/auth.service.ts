import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {apiEndPoint} from "../env";
import {HttpClient} from "@angular/common/http";
import {AuthDataService} from "./auth-data.service";
import {Router} from "@angular/router";
import {StatesService} from "./states.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  selfUserID = 0;
  isVisitor = true;
  // loadFailed = false;

  constructor(private cookieService: CookieService, private http: HttpClient, private authData: AuthDataService, private router: Router, private states: StatesService, private snackBar: MatSnackBar) {
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
      this.snackBar.open("Welcome back!", "Dismiss", {duration: 3000, verticalPosition: "top"});
      return true;
    } else {
      return false;
    }
  }

    logout() {
    this.loggedIn = false;
    this.cookieService.delete('sessionPassword');
    this.states.loadedUp = false;
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
      // const dateNow = new Date();
      // dateNow.setDate(dateNow.getDate() + 7);
      // this.cookieService.set('sessionPassword', this.authData.sessionPassword, dateNow);
      this.cookieService.delete('sessionPassword')
      this.cookieService.set('sessionPassword', this.authData.sessionPassword);
      // console.log(this.selfUserID);
      // console.log(this.authData.sessionPassword);
      this.router.navigate(["home"]).then();
      this.states.showNavBar = true;
      this.snackBar.open("login successful", "Dismiss", {duration: 1000, verticalPosition: "top"});
    });
  }
}
