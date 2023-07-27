import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../Post";
import {apiEndPoint} from "../../../env";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
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

  constructor(private http: HttpClient, private auth: AuthService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.postID = data;
  }

  ngOnInit(): void {
    this.http.get<Comment[]>(apiEndPoint + '/post/get_comments/' + this.postID + '/' + this.auth.selfUserID).subscribe(comments => {
      this.comments = comments;
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
}
