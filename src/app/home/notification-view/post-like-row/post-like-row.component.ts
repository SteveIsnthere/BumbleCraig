import {Component, Input, OnInit} from '@angular/core';
import {MainService, PostLikes} from "../../../services/main.service";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../post/Post";
import {apiEndPoint} from "../../../env";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostFullViewComponent} from "../../post/post-full-view/post-full-view.component";
import {AuthService} from "../../../services/auth.service";
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-post-like-row',
    templateUrl: './post-like-row.component.html',
    styleUrls: ['./post-like-row.component.css'],
    standalone: true,
    imports: [NgIf, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatMiniFabButton, MatIcon]
})
export class PostLikeRowComponent implements OnInit {
  @Input() postLike: PostLikes | null = null;
  postData: Post | null = null;

  constructor(public http: HttpClient, public dialog: MatDialog, private auth: AuthService, private main: MainService) {
  }

  ngOnInit(): void {
    this.http.get<Post>(apiEndPoint + '/post/get_post/' + this.postLike?.post_id).subscribe((data) => {
      this.postData = data;
    })
  }

  openPostFullView(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '85vw';
    dialogConfig.data = this.postData;
    dialogConfig.backdropClass = 'blur-back-drop';
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '60vw';

    this.dialog.open(PostFullViewComponent, dialogConfig);
    this.removeNotification()
  }

  removeNotification(): void {
    this.http.get(apiEndPoint + '/notification/clear_post_like_notification/' + this.postLike?.post_id + '/' + this.auth.selfUserID).subscribe(() => {
      this.main.fetchNotifications(true).subscribe()
    })
  }
}
