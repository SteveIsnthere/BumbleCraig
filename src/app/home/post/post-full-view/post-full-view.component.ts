import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Post} from "../Post";
import {apiEndPoint} from "../../../env";
import {PostCommentsViewComponent} from "../post-comments-view/post-comments-view.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {TextEditViewComponent} from "../../../chat/text-edit-view/text-edit-view.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-post-full-view',
  templateUrl: './post-full-view.component.html',
  styleUrls: ['./post-full-view.component.css']
})
export class PostFullViewComponent implements OnInit {
  post: Post | null = null;
  postID: number = 0;
  commentUploadRoute: string = '/post/create_comment/';
  perceptionStatus: number = 3; // 0 - none, 1 - like, 2 - dislike

  constructor(@Inject(MAT_DIALOG_DATA) public data: Post, public http: HttpClient, public auth: AuthService, private _bottomSheet: MatBottomSheet, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<PostFullViewComponent>) {
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

  openCommentSection(): void {
    this._bottomSheet.open(PostCommentsViewComponent, {
      data: this.postID,
    });
  }

  deletePost(): void {
    this.http.get(apiEndPoint + '/post/delete_post/' + this.postID + '/' + this.auth.selfUserID).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Post deleted', 'OK', {
        duration: 2000,
      })
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
    const bottomSheetRef = this._bottomSheet.open(TextEditViewComponent, {data: 'Enter your message'});
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
        })
    });
  }
}
