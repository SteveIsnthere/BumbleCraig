import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthDataService} from "../../services/auth-data.service";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  username = "";
  password = "";

  logoFigID = 0;
  loginView = false;

  constructor(private authDataService: AuthDataService, private auth: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<number>(apiEndPoint + '/others/tidder_logo_fig_id').subscribe((data) => {
      this.logoFigID = data;
      this.loginView = this.auth.loggedIn;
    })
  }

  login() {
    if (this.username === "" || this.password === "") return;
    this.http.post<number>(apiEndPoint + '/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe((data) => {
      this.authDataService.sessionPassword = data.toString();
      this.auth.loginUsingSessionPassword()
    })
  }

  continueAsVisitor() {
    this.http.get<number>(apiEndPoint + '/auth/login_as_new_user').subscribe((data) => {
      this.authDataService.sessionPassword = data.toString();
      this.auth.loginUsingSessionPassword()
    })
  }
}
