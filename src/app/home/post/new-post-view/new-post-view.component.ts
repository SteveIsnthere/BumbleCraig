import {Component, OnInit} from '@angular/core';
import {genres} from "../../../env";
import {apiEndPoint} from "../../../env";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Post} from "../Post";
import {Message} from "../../../chat/group/group-chat-view/Message";
import {TextEditViewComponent} from "../../../chat/text-edit-view/text-edit-view.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-new-post-view',
  templateUrl: './new-post-view.component.html',
  styleUrls: ['./new-post-view.component.css']
})
export class NewPostViewComponent implements OnInit {
  postID: number = 0;
  post: Post | null = null;
  title: string = '';
  genres = genres.slice(1, genres.length)
  genreSelected = this.genres[0];
  contents: Message[] = [];
  fileToUpload: File | null = null;
  fileUploadRoute: string = '/post/create_file_attachment/';
  textUploadRoute: string = '/post/create_text_attachment/';

  constructor(public http: HttpClient, public auth: AuthService, private _bottomSheet: MatBottomSheet) {

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
      if (this.genres.includes(this.post?.genre!)) {
        this.genreSelected = this.post?.genre!;
      }
      this.contents = this.post?.content!;
    })
  }

  selectGenre(genre: string) {
    this.genreSelected = genre;
  }

  updateGenre() {
    this.http.get(apiEndPoint + '/post/update_post_genre/' + this.postID + '/' + this.genreSelected).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateTitle() {
    this.http.get(apiEndPoint + '/post/update_post_title/' + this.postID + '/' + this.title).subscribe((res: any) => {
      console.log(this.title)
      console.log(res);
    })
  }

  publishPost() {
    this.http.get(apiEndPoint + '/post/toggle_post_publish_status/' + this.postID).subscribe((res: any) => {
      console.log(res);
    })
  }

  uploadFile(event: any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload === null || this.fileUploadRoute === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.http.post<string>(apiEndPoint + this.fileUploadRoute, formData).subscribe(
      () => {
        this.fileToUpload = null;
        console.log('File uploaded successfully');
        this.reloadPost();
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  openTextEditor() {
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

      this.http.get(apiEndPoint + this.textUploadRoute + "/" + textContent)
        .subscribe(() => {
          this.reloadPost();
        })
    });
  }
}
