import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./Post";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";
import {Message} from "../../chat/group/group-chat-view/Message";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PostCommentsViewComponent} from "./post-comments-view/post-comments-view.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostFullViewComponent} from "./post-full-view/post-full-view.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";
import {PostCachingService} from "../../services/post-caching.service";
import {PostFilesViewerComponent} from './post-files-viewer/post-files-viewer.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {PostPerceptionBarComponent} from './post-perception-bar/post-perception-bar.component';
import {UserMiniComponent} from '../../user/user-mini/user-mini.component';
import {
  MatCard,
  MatCardHeader,
  MatCardAvatar,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent, MatCardActions
} from '@angular/material/card';
import {NgClass} from '@angular/common';
import {OptionBtnComponent} from "../../compoents/option-btn/option-btn.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    NgClass,
    MatCardHeader,
    UserMiniComponent,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    PostPerceptionBarComponent,
    MatButton,
    MatIcon,
    MatCardContent,
    PostFilesViewerComponent,
    MatCardActions,
    OptionBtnComponent
  ],
})
export class PostComponent implements OnInit {
  @Input() postID: number = 0;
  @Input() touchMode: boolean = true;
  @Input() applicationView: boolean = false;
  post: Post | null = null;
  status: number = 0; // 0: not applied, 1: applied, 2: disliked
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
    if (this.applicationView) {
      this.status = 1;
    }
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

  openCommentSection(e: Event): void {
    e.stopPropagation();
    this._bottomSheet.open(PostCommentsViewComponent, {
      data: this.postID,
    });
  }

  openPostFullView(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '85vw';
    // dialogConfig.height = '85vh';
    dialogConfig.data = this.post;
    dialogConfig.backdropClass = 'post-back-drop';
    dialogConfig.autoFocus = false;

    this.dialog.open(PostFullViewComponent, dialogConfig);
  }

  applyListing(e: Event): void {
    e.stopPropagation()
    this.status = 1;
    this.http.get<Post>(apiEndPoint + '/application/make_application/' + this.auth.selfUserID + '/' + this.postID).subscribe(() => {
      this.snackBar.open('You have applied for this listing', 'OK', {
        duration: 2000,
      })
    })
  }

  dislikeListing(e: Event): void {
    e.stopPropagation()
    this.status = 2;
    this.http.get(apiEndPoint + '/post/dislike_post/' + this.postID + '/' + this.auth.selfUserID).subscribe(() => {
      this.snackBar.open('You have disliked this listing', 'OK', {
        duration: 2000,
      })
    })
  }

  cancelApplication(e: Event) {
    e.stopPropagation()
    this.status = 0;
    this.http.get<Post>(apiEndPoint + '/application/cancel_application/' + this.auth.selfUserID + '/' + this.postID).subscribe(() => {
      this.snackBar.open('You have cancelled your application', 'OK', {
        duration: 2000,
      })
    })
  }
}
