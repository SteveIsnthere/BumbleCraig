import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MainService} from "../../services/main.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialog} from "@angular/material/dialog";
import {UserSetUpComponent} from "../user-set-up/user-set-up.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, private _bottomSheet: MatBottomSheet, private dialog: MatDialog) {
  }
  userSetUp() {
    this.dialog.open(UserSetUpComponent);
  }

  logout() {
    this.auth.logout();
  }

}
