import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";
import {apiEndPoint} from "../../../env";

@Component({
  selector: 'app-invite-view',
  templateUrl: './invite-view.component.html',
  styleUrls: ['./invite-view.component.css']
})
export class InviteViewComponent implements OnInit {
  groupID: number = 0;
  friendIDs: number[] = [];
  invitedIDs: number[] = [];
  groupMemberIDs: number[] = [];


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public group_id: number, private http: HttpClient, public auth: AuthService, private _bottomSheet: MatBottomSheet) {
    this.groupID = group_id;
  }

  ngOnInit(): void {
    this.http.get<[]>(apiEndPoint + '/user/get_friends/' + this.auth.selfUserID).subscribe((data) => {
      this.friendIDs = data;
      this.http.get<[]>(apiEndPoint + '/group/members/' + this.groupID).subscribe((data) => {
        this.groupMemberIDs = data;
      })
    })
  }

  isInvited(userID: number): boolean {
    return this.invitedIDs.includes(userID);
  }

  isMember(userID: number): boolean {
    return this.groupMemberIDs.includes(userID);
  }

  invite(userID: number): void {
    this.http.get(apiEndPoint + '/group/invite/' + this.groupID + '/' + this.auth.selfUserID + '/' + userID).subscribe(() => {
      this.invitedIDs.push(userID);
    })
  }
}
