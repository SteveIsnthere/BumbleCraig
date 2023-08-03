import {Injectable} from '@angular/core';
import {GroupInvitation} from "../home/notification-view/groupInvitation";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {apiEndPoint} from "../env";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  groupInvitations: GroupInvitation[] = [];
  friendRequestUserIDs: number[] = [];
  newCommentIDs: number[] = [];

  constructor(public http: HttpClient, public auth: AuthService) {
    this.init()
  }

  init(): void {
    this.http.get<GroupInvitation[]>(apiEndPoint + '/group/get_group_invites/' + this.auth.selfUserID).subscribe((data) => {
      this.groupInvitations = data;
    })
    this.http.get<number[]>(apiEndPoint + '/user/get_friend_requests/' + this.auth.selfUserID).subscribe((data) => {
      this.friendRequestUserIDs = data;
    })
  }

  getTotalMessageCount(): number {
    let total = 0;
    total += this.groupInvitations.length;
    total += this.friendRequestUserIDs.length;
    return total;
  }
}
