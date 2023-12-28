import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {MainService} from "../../services/main.service";
import {UserSetUpComponent} from "../user-set-up/user-set-up.component";

@Component({
  selector: 'app-user-brief',
  templateUrl: './user-brief.component.html',
  styleUrl: './user-brief.component.css'
})
export class UserBriefComponent {
  selfUserID = this.auth.selfUserID;

  constructor(public auth: AuthService, public main: MainService, private dialog: MatDialog) {
  }

  logout() {
    this.auth.logout();
  }

  userSetUp() {
    this.dialog.open(UserSetUpComponent);
  }
}
