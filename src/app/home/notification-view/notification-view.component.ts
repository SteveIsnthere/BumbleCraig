import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {apiEndPoint} from "../../env";
import { PostLikeRowComponent } from './post-like-row/post-like-row.component';
import { PostCommentRowComponent } from './post-comment-row/post-comment-row.component';
import { SysMsgRowComponent } from './sys-msg-row/sys-msg-row.component';
import { GroupInvRowComponent } from './group-inv-row/group-inv-row.component';
import { FriendReqRowComponent } from './friend-req-row/friend-req-row.component';
import { MatIcon } from '@angular/material/icon';
import {MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'app-notification-view',
    templateUrl: './notification-view.component.html',
    styleUrls: ['./notification-view.component.scss'],
    standalone: true,
    imports: [MatButton, MatDialogClose, MatIcon, FriendReqRowComponent, GroupInvRowComponent, SysMsgRowComponent, PostCommentRowComponent, PostLikeRowComponent, MatDialogContent]
})
export class NotificationViewComponent implements OnInit, OnDestroy {
  constructor(public main: MainService, public http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.main.shouldFetchNotifications = false;
  }

  ngOnDestroy(): void {
    this.main.shouldFetchNotifications = true;
  }

  showCleanAllButton(): boolean {
    return this.main.notifications!.system_messages!.length + this.main.notifications!.post_comments!.length + this.main.notifications!.post_likes!.length > 0;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000, verticalPosition: 'top'});
  }

  clear(): void {
    this.http.get(apiEndPoint + '/notification/clear_all_notifications/' + this.auth.selfUserID).subscribe(() => {
      this.main.fetchNotifications(true).subscribe()
      this.openSnackBar('All notifications cleared', 'OK')
    })
  }

  protected readonly length = length;
}
