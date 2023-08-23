import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {apiEndPoint} from "../../env";

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.css']
})
export class NotificationViewComponent implements OnInit, OnDestroy {
  constructor(public main: MainService, public http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.main.clearFetchNotificationsInterval()
  }

  ngOnDestroy(): void {
    this.main.setupFetchNotificationsInterval()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000, verticalPosition: 'top'});
  }

  clearSysMessages(): void {
    this.http.get(apiEndPoint + '/notification/clear_system_message_notification/' + this.auth.selfUserID).subscribe(() => {
      this.main.fetchNotifications()
      this.openSnackBar('System messages cleared', 'Dismiss')
    })
  }

  protected readonly length = length;
}
