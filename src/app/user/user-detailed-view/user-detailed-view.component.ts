import {Component, OnInit} from '@angular/core';
import {UserComponent} from "../user.component";
import {apiEndPoint} from "../../env";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-detailed-view',
  templateUrl: './user-detailed-view.component.html',
  styleUrls: ['./user-detailed-view.component.css']
})
export class UserDetailedViewComponent extends UserComponent implements OnInit {
  userDescription = 'loading...';
  isFriend = false;
  friendRequestSent = false;
  showClippedFigure = true
  xp = 0;
  postIDs: number[] = [];

  constructor(http: HttpClient, public route: ActivatedRoute, public auth: AuthService, private dialogRef: MatDialog, private _snackBar: MatSnackBar) {
    super(http);
  }

  override ngOnInit(): void {
    this.dialogRef.closeAll();
    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });
    super.ngOnInit();
    this.http.get<boolean>(apiEndPoint + '/user/friend_status/' + this.auth.selfUserID + '/' + this.userID).subscribe((data) => {
      this.isFriend = data;
    });
    this.http.get<string>(apiEndPoint + '/user/description/' + this.userID).subscribe((data) => {
      this.userDescription = data;
    });
    this.http.get<number[]>(apiEndPoint + '/post/get_post_ids_of_user/' + this.userID).subscribe((data) => {
      this.postIDs = data;
    })
    this.http.get<number>(apiEndPoint + '/user/experience/' + this.userID).subscribe((data) => {
      this.xp = data;
    })
  }

  sendFriendRequest() {
    this.http.get(apiEndPoint + '/user/create_friend_request/' + this.auth.selfUserID + '/' + this.userID, {}).subscribe(() => {
      this.friendRequestSent = true;
      this.openSnackBar('Friend request sent', 'OK');
    })
  }

  removeFriend() {
    this.http.get(apiEndPoint + '/user/remove_friend/' + this.auth.selfUserID + '/' + this.userID, {}).subscribe(() => {
      this.isFriend = false;
      this.openSnackBar('Friend removed', 'OK');
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000});
  }
}
