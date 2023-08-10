import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {MainService} from "../services/main.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {NotificationViewComponent} from "./notification-view/notification-view.component";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../env";
import {MatDialog} from "@angular/material/dialog";
import {UserSetUpComponent} from "../user/user-set-up/user-set-up.component";
import {dummyEssentialUserData, EssentialUserData} from "../user/UserModel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  haveUnreadMsg: boolean = false;
  selfFigID: number = 0;
  msgFetchInterval: any = 0;

  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, private _bottomSheet: MatBottomSheet, private dialog: MatDialog) {
  }

  openNotificationView() {
    this.http.get<any>(apiEndPoint + '/others/visit_notification/' + this.auth.selfUserID).subscribe(() => {
    })
    this._bottomSheet.open(NotificationViewComponent);
  }

  ngOnInit(): void {
    this.fetchUnreadMsg();
    this.http.get<EssentialUserData>(apiEndPoint + '/user/' + this.auth.selfUserID).subscribe((data) => {
      this.selfFigID = data.figure_id;
    })
    this.msgFetchInterval = setInterval(() => {
      this.fetchUnreadMsg();
    }, 15000)
  }

  ngOnDestroy(): void {
    clearInterval(this.msgFetchInterval);
  }

  fetchUnreadMsg() {
    this.http.get<boolean>(apiEndPoint + '/group/have_unread_msg/' + this.auth.selfUserID).subscribe((data) => {
      this.haveUnreadMsg = data;
    })
  }

  notificationCount() {
    let result = 0;
    result += this.main.getTotalMessageCount();
    if (this.auth.isVisitor) result++;
    return result;
  }

  userSetUp() {
    this.dialog.open(UserSetUpComponent);
  }

  protected readonly dummyEssentialUserData = dummyEssentialUserData;
}
