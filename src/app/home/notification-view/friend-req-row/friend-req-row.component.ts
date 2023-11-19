import {Component, Input} from '@angular/core';
import {apiEndPoint} from "../../../env";
import {MainService} from "../../../services/main.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-friend-req-row',
  templateUrl: './friend-req-row.component.html',
  styleUrls: ['./friend-req-row.component.css']
})
export class FriendReqRowComponent {
  @Input() id: number = 0;

  constructor(public main: MainService, public http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar) {
  }

  acceptFriendRequest(friendRequestUserID: number) {
    this.http.get(apiEndPoint + '/user/accept_friend_request/' + this.auth.selfUserID + '/' + friendRequestUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.main.fetchNotifications(true).subscribe()
    })
  }

  rejectFriendRequest(friendRequestUserID: number) {
    this.http.get(apiEndPoint + '/user/reject_friend_request/' + this.auth.selfUserID + '/' + friendRequestUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.main.fetchNotifications(true).subscribe()
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000});
  }
}
