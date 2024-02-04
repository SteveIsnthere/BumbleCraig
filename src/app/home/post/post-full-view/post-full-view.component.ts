import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Post} from "../Post";
import {apiEndPoint} from "../../../env";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {TextEditViewComponent} from "../../../chat/text-edit-view/text-edit-view.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialogActions } from "@angular/material/dialog";
import {MainService} from "../../../services/main.service";
import { ReusableCommentsViewComponent } from '../post-comments-view/reusable-comments-view/reusable-comments-view.component';
import { FileShareComponent } from '../../../file-share/file-share.component';
import { MatDivider } from '@angular/material/divider';
import { MatChipOption } from '@angular/material/chips';
import { UserMiniComponent } from '../../../user/user-mini/user-mini.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-post-full-view',
    templateUrl: './post-full-view.component.html',
    styleUrls: ['./post-full-view.component.css'],
    standalone: true,
    imports: [NgIf, MatDialogContent, MatButton, MatDialogClose, MatIcon, UserMiniComponent, MatChipOption, MatDivider, NgFor, FileShareComponent, ReusableCommentsViewComponent, MatDialogActions, MatMiniFabButton]
})
export class PostFullViewComponent implements OnInit {
  post: Post | null = null;
  postID: number = 0;
  commentUploadRoute: string = '/post/create_comment/';
  perceptionStatus: number = 3; // 0 - none, 1 - like, 2 - dislike

  constructor(@Inject(MAT_DIALOG_DATA) public data: Post, public http: HttpClient, public auth: AuthService, public main: MainService, private _bottomSheet: MatBottomSheet, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<PostFullViewComponent>) {
    this.post = data;
    this.postID = data.post_id;
  }

  ngOnInit(): void {
    this.commentUploadRoute += this.postID;
    this.commentUploadRoute += '/' + this.auth.selfUserID;
    this.http.get(apiEndPoint + '/post/view_post/' + this.post?.post_id + '/' + this.auth.selfUserID).subscribe(() => {
    })

    this.http.get<number>(apiEndPoint + '/post/get_perception_status/' + this.postID + '/' + this.auth.selfUserID).subscribe((data) => {
      this.perceptionStatus = data;
    })
  }

  deletePost(): void {
    this.http.get(apiEndPoint + '/post/delete_post/' + this.postID + '/' + this.auth.selfUserID).subscribe(() => {
      this.dialogRef.close();
      this.main.reloadPosts();
      this.snackBar.open('Post deleted', 'OK', {
        duration: 2000,
      })
      //refresh page
      // window.location.reload();
    })
  }

  isLink(text: string): boolean {
    let url;
    try {
      url = new URL(text);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  likePost(): void {
    if (this.perceptionStatus != 0) return
    this.http.get(apiEndPoint + '/post/like_post/' + this.postID + '/' + this.auth.selfUserID).subscribe(() => {
      this.perceptionStatus = 1;
    })
  }

  dislikePost(): void {
    if (this.perceptionStatus != 0) return
    this.http.get(apiEndPoint + '/post/dislike_post/' + this.postID + '/' + this.auth.selfUserID).subscribe(() => {
      this.perceptionStatus = 2;
    })
  }

  writeComment(): void {
    const bottomSheetRef = this._bottomSheet.open(TextEditViewComponent, {data: 'Write a comment'});
    bottomSheetRef.afterDismissed().subscribe(textContent => {
      if (typeof textContent != 'string') {
        console.log('Text content is not a string')
        return
      }
      if (textContent.length == 0) {
        console.log('Text content is empty')
        return
      }
      this.http.post(apiEndPoint + this.commentUploadRoute, textContent)
        .subscribe(() => {
          this.post!.number_of_comments++;
          this.snackBar.open('Your comment is live', 'OK', {
            duration: 2000,
          })
        })
    });
  }
}
