import {Component, OnInit} from '@angular/core';
import {MainService} from "../services/main.service";
import {StatesService} from "../services/states.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserSetUpComponent} from "../user/user-set-up/user-set-up.component";
import {AuthService} from "../services/auth.service";
import {siteName} from "../env";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public router: Router, public auth: AuthService, public main: MainService, public states: StatesService, private dialog: MatDialog) {
    setTimeout(() => {
      this.states.loadedUp = true;
    }, 2000);
  }

  ngOnInit() {
    if (this.states.loadedUp) return;
    this.main.fetchNotifications().subscribe();
  }

  userSetUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'post-back-drop';
    this.dialog.open(UserSetUpComponent, dialogConfig);
  }

  protected readonly siteName = siteName;
}
