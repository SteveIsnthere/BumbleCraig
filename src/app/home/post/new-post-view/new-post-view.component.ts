import {Component, OnInit} from '@angular/core';
import {genres} from "../../../env";
import {apiEndPoint} from "../../../env";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Post} from "../Post";
import {Message} from "../../../chat/group/group-chat-view/Message";
import {TextEditViewComponent} from "../../../chat/text-edit-view/text-edit-view.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {MainService} from "../../../services/main.service";

@Component({
  selector: 'app-new-post-view',
  templateUrl: './new-post-view.component.html',
  styleUrls: ['./new-post-view.component.css'],
})
export class NewPostViewComponent implements OnInit {
  postID: number = 0;
  post: Post | null = null;
  title: string = '';
  genres = genres.slice(1, genres.length)
  genreSelected = this.genres[0];
  contents: Message[] = [];
  fileToUpload: File | null = null;
  uploadingFile: boolean = false;
  fileUploadRoute: string = '/post/create_file_attachment/';
  textUploadRoute: string = '/post/create_text_attachment/';
  articleMode: boolean = true;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  constructor(public http: HttpClient, public auth: AuthService, private main: MainService, private _bottomSheet: MatBottomSheet, public dialogRef: MatDialogRef<NewPostViewComponent>, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.http.get(apiEndPoint + '/post/create_post/' + this.auth.selfUserID + '/' + this.genreSelected).subscribe((res: any) => {
      this.postID = res;
      this.fileUploadRoute += this.postID;
      this.fileUploadRoute += '/' + this.auth.selfUserID;
      this.textUploadRoute += this.postID;
      this.textUploadRoute += '/' + this.auth.selfUserID;
      this.reloadPost();
    })
  }

  reloadPost() {
    this.http.get(apiEndPoint + '/post/get_post/' + this.postID).subscribe((res: any) => {
      this.post = res;
      this.title = this.post?.title!;
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: [this.title, Validators.required],
      });
      if (this.genres.includes(this.post?.genre!)) {
        this.genreSelected = this.post?.genre!;
      }
      this.contents = this.post?.content!;
      this.scrollToElement('action-section');
    })
  }

  selectGenre(genre: string) {
    this.genreSelected = genre;
  }

  updateGenre() {
    this.http.get(apiEndPoint + '/post/update_post_genre/' + this.postID + '/' + this.genreSelected + '/' + this.auth.selfUserID).subscribe(() => {
    })
  }

  updateTitle() {
    const maxTitleLength = 70;
    if (!this.firstFormGroup.valid) return;
    if (this.title.length > maxTitleLength) {
      this.title = this.title.slice(0, maxTitleLength);
      this._snackBar.open('Title too long, will be trimmed', 'Understood', {
        duration: 2000,
      });
    }
    this.http.post(apiEndPoint + '/post/update_post_title/' + this.postID + '/' + this.auth.selfUserID, this.title).subscribe(() => {
    })
  }

  publishPost() {
    if (this.post?.content?.length == 0) {
      this._snackBar.open("Post can't be empty", 'Understood', {
        duration: 2000,
      });
      return;
    }
    this.http.get(apiEndPoint + '/post/toggle_post_publish_status/' + this.postID + '/' + this.auth.selfUserID).subscribe((res: any) => {
      console.log(res);
      this.main.reloadPosts();
      this._snackBar.open('Your Post is live!!', 'yay', {
        verticalPosition: 'top',
        duration: 2000,
      });
      this.dialogRef.close();
    })
  }

  uploadFile(event: any) {
    this.uploadingFile = true;
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload === null || this.fileUploadRoute === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.http.post<string>(apiEndPoint + this.fileUploadRoute, formData).subscribe(
      () => {
        this.fileToUpload = null;
        this.uploadingFile = false;
        this.reloadPost();
      },
      (error) => {
        this.fileToUpload = null;
        this.uploadingFile = false;
        console.error('Error uploading file:', error);
      }
    );
  }

  openTextEditor() {
    const bottomSheetRef = this._bottomSheet.open(TextEditViewComponent, {data: 'Enter your text here'});
    bottomSheetRef.afterDismissed().subscribe(textContent => {
      if (typeof textContent != 'string') {
        console.log('Text content is not a string')
        return
      }
      if (textContent.length == 0) {
        console.log('Text content is empty')
        return
      }
      this.http.post(apiEndPoint + this.textUploadRoute, textContent)
        .subscribe(() => {
          this.reloadPost();
          this.scrollToElement('action-section');
        })
    });
  }

  deleteAttachment(content: Message) {
    if (content.file_share_id != 0) {
      this.http.get(apiEndPoint + '/post/delete_file_attachment/' + content.file_share_id + '/' + this.auth.selfUserID).subscribe(() => {
        this.reloadPost();
      })
    } else {
      this.http.get(apiEndPoint + '/post/delete_text_attachment/' + content.content + '/' + content.sender_id + '/' + content.time).subscribe(() => {
        this.reloadPost();
      })
    }
  }

  changeTitle(event: any) {
    this.title = event.target.value;
  }

  selectionChange($event: StepperSelectionEvent) {
    if ($event.selectedIndex === 2 && $event.previouslySelectedIndex === 1) {
      this.updateTitle();
    } else if ($event.selectedIndex === 1 && $event.previouslySelectedIndex === 0) {
      this.updateGenre();
    }
  }

  scrollToElement(id: string): void {
    setTimeout(() => {
      document.getElementById(id)!.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 100);
  }
}
