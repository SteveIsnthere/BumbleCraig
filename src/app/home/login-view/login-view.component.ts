import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthDataService} from "../../services/auth-data.service";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit, OnDestroy {

  username = "";
  password = "";

  logoFigID = 0;
  loginView: boolean | null = null;
  newUserLoading = false;
  loginLoading = false;
  wrongCredentials = false;
  figUpdateInterval: any = 0;

  constructor(private authDataService: AuthDataService, private auth: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<number>(apiEndPoint + '/others/tidder_logo_fig_id').subscribe((data) => {
      this.logoFigID = data;
      this.loginView = false;
    })

    this.figUpdateInterval = setInterval(() => {
      this.logoFigID = 0;
      this.http.get<number>(apiEndPoint + '/others/tidder_logo_fig_id').subscribe((data) => {
        this.logoFigID = data;
      })
    }, 15000)
  }

  ngOnDestroy(): void {
    clearInterval(this.figUpdateInterval);
  }

  login() {
    if (this.username === "" || this.password === "") return;
    this.loginLoading = true;
    this.http.post<number>(apiEndPoint + '/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe((data) => {
        localStorage.clear()
        this.authDataService.sessionPassword = data.toString();
        this.auth.loginUsingSessionPassword()
      },
      () => {
        this.loginLoading = false;
        this.wrongCredentials = true;
      }
    )
  }

  continueAsVisitor() {
    this.newUserLoading = true;
    localStorage.clear()
    this.http.get<number>(apiEndPoint + '/auth/login_as_new_user').subscribe((data) => {
      this.authDataService.sessionPassword = data.toString();
      this.auth.loginUsingSessionPassword()
    })
  }
}
