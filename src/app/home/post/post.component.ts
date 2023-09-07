import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./Post";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";
import {Message} from "../../chat/group/group-chat-view/Message";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PostCommentsViewComponent} from "./post-comments-view/post-comments-view.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostFullViewComponent} from "./post-full-view/post-full-view.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() postID: number = 0;
  post: Post | null = null;
  textAttachments: Message[] = [];
  fileAttachments: Message[] = [];
  textOnlyMode = false;


  constructor(public http: HttpClient, private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {
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
        this.fileAttachments.push(this.post!.content[i]);
      } else {
        textAttachmentIndexes.push(i);
        this.textAttachments.push(this.post!.content[i]);
      }
    }

    if (this.textAttachments.length > 2) {
      this.textAttachments = this.textAttachments.slice(0, 2);
    }

    // if (fileAttachmentIndexes.length == 0) {
    //   // no file attachment
    //   this.textAttachments = this.post!.content.slice(0, 2);
    // } else if (textAttachmentIndexes.length == 0) {
    //   // no text attachment but file attachments exist
    //   this.textAttachments.push(this.post!.content[0]);
    // } else {
    //   // both file and text attachments exist
    //   let firstFileAttachmentIndex = fileAttachmentIndexes[0];
    //   let firstTextAttachmentIndex = textAttachmentIndexes[0];
    //   if (firstFileAttachmentIndex < firstTextAttachmentIndex) {
    //     // file attachment first
    //     this.textAttachments.push(this.post!.content[firstFileAttachmentIndex]);
    //     this.textAttachments.push(this.post!.content[firstTextAttachmentIndex]);
    //   } else {
    //     // text attachment first
    //     this.textAttachments.push(this.post!.content[firstTextAttachmentIndex]);
    //     this.textAttachments.push(this.post!.content[firstFileAttachmentIndex]);
    //   }
    // }
  }

  openCommentSection(): void {
    this._bottomSheet.open(PostCommentsViewComponent, {
      data: this.postID,
    });
  }

  openPostFullView(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '85vw';
    dialogConfig.data = this.post;
    dialogConfig.backdropClass = 'blur-back-drop';
    dialogConfig.autoFocus = true;

    this.dialog.open(PostFullViewComponent, dialogConfig);
  }
}
