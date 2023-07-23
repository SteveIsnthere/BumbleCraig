import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {MainService} from "../services/main.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {NotificationViewComponent} from "./notification-view/notification-view.component";
import {HttpClient} from "@angular/common/http";
import {NewPostViewComponent} from "./post/new-post-view/new-post-view.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {
  }

  openNotificationView() {
    this._bottomSheet.open(NotificationViewComponent);
  }

  openNewPostView() {
    this.dialog.open(NewPostViewComponent);
  }
}
