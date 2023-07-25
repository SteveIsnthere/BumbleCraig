import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Post} from "../Post";
import {apiEndPoint} from "../../../env";
import {PostCommentsViewComponent} from "../post-comments-view/post-comments-view.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {TextEditViewComponent} from "../../../chat/text-edit-view/text-edit-view.component";

@Component({
  selector: 'app-post-full-view',
  templateUrl: './post-full-view.component.html',
  styleUrls: ['./post-full-view.component.css']
})
export class PostFullViewComponent implements OnInit {
  post: Post | null = null;
  postID: number = 0;
  commentUploadRoute: string = '/post/create_comment/';

  constructor(public http: HttpClient, public route: ActivatedRoute, public auth: AuthService, private _bottomSheet: MatBottomSheet, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postID = params['id'];
      this.http.get<Post>(apiEndPoint + '/post/get_post/' + this.postID).subscribe((data) => {
        this.post = data;
        this.commentUploadRoute += this.postID;
        this.commentUploadRoute += '/' + this.auth.selfUserID;
      })
    });
  }

  openCommentSection(): void {
    this._bottomSheet.open(PostCommentsViewComponent, {
      data: this.postID,
    });
  }

  deletePost(): void {
    this.http.get(apiEndPoint + '/post/delete_post/' + this.postID).subscribe(() => {
      this.router.navigate(['/home']);
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
      this.http.get(apiEndPoint + this.commentUploadRoute + "/" + textContent)
        .subscribe(() => {
          this.post!.number_of_comments++;
        })
    });
  }
}
