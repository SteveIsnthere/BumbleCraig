import {Component, OnInit} from '@angular/core';
import {UserComponent} from "../user.component";
import {apiEndPoint} from "../../env";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

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

  constructor(http: HttpClient, public route: ActivatedRoute, public auth: AuthService) {
    super(http);
  }

  override ngOnInit(): void {
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
  }

  sendFriendRequest() {
    this.http.get(apiEndPoint + '/user/create_friend_request/' + this.auth.selfUserID + '/' + this.userID, {}).subscribe(() => {
      this.friendRequestSent = true;
    })
  }

  removeFriend() {
    this.http.get(apiEndPoint + '/user/remove_friend/' + this.auth.selfUserID + '/' + this.userID, {}).subscribe(() => {
      this.isFriend = false;
    })
  }
}
