import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./Post";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";
import {Message} from "../../chat/group/group-chat-view/Message";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PostCommentsViewComponent} from "./post-comments-view/post-comments-view.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PostFullViewComponent} from "./post-full-view/post-full-view.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postID: number = 0;
  post: Post | null = null;
  postPreviewContents: Message[] = [];

  constructor(public http: HttpClient, private router: Router, private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.http.get<Post>(apiEndPoint + '/post/get_post/' + this.postID).subscribe((data) => {
      this.post = data;
      // console.log(this.post.rating)
      this.buildPostPreviewContent()
    })
  }

  buildPostPreviewContent(): void {
    let numberOfAttachments = this.post!.content.length;
    if (numberOfAttachments == 0) {
      return;
    }

    let fileAttachmentIndexes = [];
    let textAttachmentIndexes = [];
    for (let i = 0; i < this.post!.content.length; i++) {
      if (this.post!.content[i].file_share_id != 0) {
        fileAttachmentIndexes.push(i);
      } else {
        textAttachmentIndexes.push(i);
      }
    }

    if (fileAttachmentIndexes.length == 0) {
      // no file attachment
      this.postPreviewContents = this.post!.content.slice(0, 2);
    } else if (textAttachmentIndexes.length == 0) {
      // no text attachment but file attachments exist
      this.postPreviewContents.push(this.post!.content[0]);
    } else {
      // both file and text attachments exist
      let firstFileAttachmentIndex = fileAttachmentIndexes[0];
      let firstTextAttachmentIndex = textAttachmentIndexes[0];
      if (firstFileAttachmentIndex < firstTextAttachmentIndex) {
        // file attachment first
        this.postPreviewContents.push(this.post!.content[firstFileAttachmentIndex]);
        this.postPreviewContents.push(this.post!.content[firstTextAttachmentIndex]);
      } else {
        // text attachment first
        this.postPreviewContents.push(this.post!.content[firstTextAttachmentIndex]);
        this.postPreviewContents.push(this.post!.content[firstFileAttachmentIndex]);
      }
    }

    // if (numberOfAttachments > 2) {
    //   this.postPreviewContents.push(dummyMessage())
    // }
  }

  openCommentSection(): void {
    this._bottomSheet.open(PostCommentsViewComponent, {
      data: this.postID,
    });
  }

  openPostFullView(): void {
    this.dialog.open(PostFullViewComponent, {
      data: this.post,
      maxWidth: '95vw',
    });
  }
}
