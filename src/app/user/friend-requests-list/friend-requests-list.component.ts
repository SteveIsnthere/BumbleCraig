import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {apiEndPoint} from "../../env";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-friend-requests-list',
  templateUrl: './friend-requests-list.component.html',
  styleUrls: ['./friend-requests-list.component.css']
})
export class FriendRequestsListComponent implements OnInit {
  friendRequestUserIDs: number[] = [];

  constructor(public http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.http.get(apiEndPoint + '/user/get_friend_requests/' + this.auth.selfUserID).subscribe((data: any) => {
      this.friendRequestUserIDs = data;
    })
  }

  acceptFriendRequest(friendRequestUserID: number) {
    this.http.get(apiEndPoint + '/user/accept_friend_request/' + this.auth.selfUserID + '/' +friendRequestUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.ngOnInit();
    })
  }

  rejectFriendRequest(friendRequestUserID: number) {
    this.http.get(apiEndPoint + '/user/reject_friend_request/' + this.auth.selfUserID + '/' +friendRequestUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.ngOnInit();
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000});
  }

}
