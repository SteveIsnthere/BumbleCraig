import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../Post";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {apiEndPoint} from "../../../../env";
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatMiniFabButton } from '@angular/material/button';
import { PostPerceptionBarComponent } from '../../post-perception-bar/post-perception-bar.component';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { UserMiniComponent } from '../../../../user/user-mini/user-mini.component';


@Component({
    selector: 'app-reusable-comments-view',
    templateUrl: './reusable-comments-view.component.html',
    styleUrls: ['./reusable-comments-view.component.css'],
    standalone: true,
    imports: [UserMiniComponent, MatExpansionPanel, MatExpansionPanelHeader, MatIcon, PostPerceptionBarComponent, MatMiniFabButton, MatProgressBar]
})
export class ReusableCommentsViewComponent implements OnInit {
  @Input() postID: number = 0;
  comments: Comment[] = [];
  completeLoading: boolean = false;
  panelStates: boolean[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {
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
}
