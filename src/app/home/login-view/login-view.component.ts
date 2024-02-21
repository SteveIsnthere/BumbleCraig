import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthDataService} from "../../services/auth-data.service";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint, siteName} from "../../env";
import { BackgroundComponent } from '../../compoents/background/background.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatChip } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-login-view',
    templateUrl: './login-view.component.html',
    styleUrls: ['./login-view.component.scss'],
    standalone: true,
    imports: [NgClass, FormsModule, MatChip, MatFormField, MatLabel, MatInput, MatButton, MatIcon, MatProgressSpinner, MatProgressBar, BackgroundComponent]
})
export class LoginViewComponent implements OnInit, OnDestroy {

  username = "";
  password = "";

  loginView: boolean | null = null;
  newUserLoading = false;
  loginLoading = false;
  wrongCredentials = false;
  figUpdateInterval: any = 0;

  constructor(private authDataService: AuthDataService, private auth: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loginView = true;
  }

  ngOnDestroy(): void {
    clearInterval(this.figUpdateInterval);
  }

  login(e:Event) {
    e.preventDefault();
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
      this.auth.loginUsingSessionPassword(true)
    })
  }

    protected readonly siteName = siteName;
}
