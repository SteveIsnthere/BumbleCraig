import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./Post";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";
import {Message} from "../../chat/group/group-chat-view/Message";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PostCommentsViewComponent} from "./post-comments-view/post-comments-view.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostFullViewComponent} from "./post-full-view/post-full-view.component";
// import {TextEditViewComponent} from "../../chat/text-edit-view/text-edit-view.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";
import {PostCachingService} from "../../services/post-caching.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() postID: number = 0;
  @Input() touchMode: boolean = true;
  post: Post | null = null;
  commentUploadRoute: string = '/post/create_comment/';
  textAttachments: Message[] = [];
  fileAttachments: Message[] = [];


  constructor(public http: HttpClient, private _bottomSheet: MatBottomSheet, public dialog: MatDialog, public auth: AuthService, private snackBar: MatSnackBar, private cache: PostCachingService) {
  }

  ngOnInit(): void {
    let cachedData = this.cache.get(this.postID);
    if (cachedData) {
      this.post = cachedData;
      this.buildPostPreviewContent()

      // if (Math.random() < 0.5) {
      //   return
      // }
      setTimeout(() => {
        this.http.get<Post>(apiEndPoint + '/post/get_post/' + this.postID).subscribe((data) => {
          if (data != this.post) {
            this.post = data;
            this.cache.set(data);
            this.buildPostPreviewContent()
          }
        })
      }, 1000 + Math.random() * 5000)
    } else {
      this.http.get<Post>(apiEndPoint + '/post/get_post/' + this.postID).subscribe((data) => {
        this.post = data;
        this.cache.set(data);
        this.buildPostPreviewContent()
      })
    }
    this.commentUploadRoute += this.postID;
    this.commentUploadRoute += '/' + this.auth.selfUserID;
  }

  buildPostPreviewContent(): void {
    this.textAttachments = [];
    this.fileAttachments = [];
    for (let i = 0; i < this.post!.content.length; i++) {
      if (this.post!.content[i].file_share_id != 0) {
        this.fileAttachments.push(this.post!.content[i]);
      } else {
        this.textAttachments.push(this.post!.content[i]);
      }
    }

    let textAttachmentsMaxLength = 2;
    if (this.fileAttachments.length > 0) {
      textAttachmentsMaxLength = 1;
    }
    if (this.textAttachments.length > textAttachmentsMaxLength) {
      this.textAttachments = this.textAttachments.slice(0, textAttachmentsMaxLength);
    }
  }

  openCommentSection(e:Event): void {
    e.stopPropagation();
    this._bottomSheet.open(PostCommentsViewComponent, {
      data: this.postID,
    });
  }

  openPostFullView(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '85vw';
    dialogConfig.data = this.post;
    dialogConfig.backdropClass = 'post-back-drop';
    dialogConfig.autoFocus = true;

    this.dialog.open(PostFullViewComponent, dialogConfig);
  }

  // writeComment(): void {
  //   const bottomSheetRef = this._bottomSheet.open(TextEditViewComponent, {data: 'Write a comment'});
  //   bottomSheetRef.afterDismissed().subscribe(textContent => {
  //     if (typeof textContent != 'string') {
  //       console.log('Text content is not a string')
  //       return
  //     }
  //     if (textContent.length == 0) {
  //       console.log('Text content is empty')
  //       return
  //     }
  //     this.http.post(apiEndPoint + this.commentUploadRoute, textContent)
  //       .subscribe(() => {
  //         this.post!.number_of_comments++;
  //         this.snackBar.open('Your comment is live', 'OK', {
  //           duration: 2000,
  //         })
  //       })
  //   });
  // }
}
