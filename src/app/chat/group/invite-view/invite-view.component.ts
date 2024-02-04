import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {apiEndPoint} from "../../../env";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { UserComponent } from '../../../user/user.component';
import { NgIf, NgFor } from '@angular/common';
import { MatChipOption } from '@angular/material/chips';

@Component({
    selector: 'app-invite-view',
    templateUrl: './invite-view.component.html',
    styleUrls: ['./invite-view.component.css'],
    standalone: true,
    imports: [MatChipOption, NgIf, NgFor, UserComponent, MatMiniFabButton, MatIcon, MatProgressBar]
})
export class InviteViewComponent implements OnInit {
  groupID: number = 0;
  friendIDs: number[] = [];
  invitedIDs: number[] = [];
  groupMemberIDs: number[] = [];
  loading: boolean = true;


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public group_id: number, private http: HttpClient, public auth: AuthService, private _snackBar: MatSnackBar) {
    this.groupID = group_id;
  }

  ngOnInit(): void {
    this.http.get<[]>(apiEndPoint + '/user/get_friends/' + this.auth.selfUserID).subscribe((data) => {
      this.friendIDs = data;
      this.loading = false;
      this.http.get<[]>(apiEndPoint + '/group/members/' + this.groupID + '/' + this.auth.selfUserID).subscribe((data) => {
        this.groupMemberIDs = data;
      })
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000, verticalPosition: 'top'});
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
      this.openSnackBar('Invitation sent', 'OK');
    })
  }
}
