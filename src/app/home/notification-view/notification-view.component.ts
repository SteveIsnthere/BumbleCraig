import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {GroupInvitation} from "./groupInvitation";
import {apiEndPoint} from "../../env";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.css']
})
export class NotificationViewComponent implements OnInit {
  constructor(public main: MainService, public http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  acceptFriendRequest(friendRequestUserID: number) {
    this.http.get(apiEndPoint + '/user/accept_friend_request/' + this.auth.selfUserID + '/' + friendRequestUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.main.fetchNotifications();
    })
  }

  rejectFriendRequest(friendRequestUserID: number) {
    this.http.get(apiEndPoint + '/user/reject_friend_request/' + this.auth.selfUserID + '/' + friendRequestUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.main.fetchNotifications();
    })
  }

  acceptGroupInvitation(groupInvitation: GroupInvitation) {
    this.http.get(apiEndPoint + '/group/accept-invite/' + groupInvitation.group_id + '/' + this.auth.selfUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.main.fetchNotifications();
    })
  }

  rejectGroupInvitation(groupInvitation: GroupInvitation) {
    this.http.get(apiEndPoint + '/group/decline-invite/' + groupInvitation.group_id + '/' + this.auth.selfUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.main.fetchNotifications();
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000});
  }

  protected readonly length = length;
}
