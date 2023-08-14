import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../Post";
import {apiEndPoint} from "../../../env";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-post-comments-view',
  templateUrl: './post-comments-view.component.html',
  styleUrls: ['./post-comments-view.component.css']
})
export class PostCommentsViewComponent implements OnInit {
  postID: number = 0;
  comments: Comment[] = [];
  completeLoading: boolean = false;
  panelStates: boolean[] = [];

  constructor(private http: HttpClient, private auth: AuthService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef<PostCommentsViewComponent>) {
    this.postID = data;
  }

  ngOnInit(): void {
    this.http.get<Comment[]>(apiEndPoint + '/post/get_comments/' + this.postID + '/' + this.auth.selfUserID).subscribe(comments => {
      this.comments = comments;
      for (let i = 0; i < this.comments.length; i++) {
        this.panelStates.push(false);
      }
      this.completeLoading = true;
    })
  }

  likeComment(comment: Comment) {
    this.http.get(apiEndPoint + '/post/like_comment/' + comment.comment_id + '/' + this.auth.selfUserID).subscribe(() => {
      comment.perception_status = 1;
    })
  }

  dislikeComment(comment: Comment) {
    this.http.get(apiEndPoint + '/post/dislike_comment/' + comment.comment_id + '/' + this.auth.selfUserID).subscribe(() => {
      comment.perception_status = 2;
    })
  }


  closeCommentsSection() {
    this.bottomSheetRef.dismiss();
  }
}
