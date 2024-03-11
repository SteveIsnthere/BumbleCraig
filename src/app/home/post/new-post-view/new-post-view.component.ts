import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {neighbourhoods} from "../../../env";
import {apiEndPoint} from "../../../env";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Post} from "../Post";
import {Message} from "../../../chat/group/group-chat-view/Message";
import {TextEditViewComponent} from "../../../chat/text-edit-view/text-edit-view.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MainService} from "../../../services/main.service";
import {Router} from "@angular/router";
import {EMPTY, forkJoin, Observable, switchMap} from "rxjs";
import {MatDivider} from '@angular/material/divider';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton, MatButton} from '@angular/material/button';
import {FileShareComponent} from '../../../file-share/file-share.component';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatInput} from '@angular/material/input';
import {MatFormField, MatLabel} from '@angular/material/form-field';

import {MatChipListbox, MatChipOption} from '@angular/material/chips';
import {MatSlider, MatSliderThumb} from "@angular/material/slider";

@Component({
  selector: 'app-new-post-view',
  templateUrl: './new-post-view.component.html',
  styleUrls: ['./new-post-view.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatChipListbox,
    MatChipOption,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
    FileShareComponent,
    MatMiniFabButton,
    MatIcon,
    MatProgressBar,
    MatDivider,
    MatButton,
    MatSlider,
    MatSliderThumb
  ],
})
export class NewPostViewComponent implements OnInit, OnDestroy {
  postID: number = 0;
  post: Post | null = null;
  title: string = '';
  price: number = 0;
  neighbourhoods = neighbourhoods.slice(1, neighbourhoods.length)
  neighbourhoodSelected = this.neighbourhoods[0];
  contents: Message[] = [];
  fileToUpload: File | null = null;
  uploadingFile: boolean = false;
  fileUploadRoute: string = '/post/create_file_attachment/';
  textUploadRoute: string = '/post/create_text_attachment/';
  observer: any;
  changeTitleTimeout: any;
  changePriceTimeout: any;
  contentsContainer: any;
  firstLoad: boolean = true;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  constructor(public http: HttpClient, public auth: AuthService, private main: MainService, private _bottomSheet: MatBottomSheet, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private elementRef: ElementRef, private router: Router) {
  }

  ngOnInit(): void {
    this.http.get(apiEndPoint + '/post/create_post/' + this.auth.selfUserID).subscribe((res: any) => {
      this.postID = res;
      this.fileUploadRoute += this.postID;
      this.fileUploadRoute += '/' + this.auth.selfUserID;
      this.textUploadRoute += this.postID;
      this.textUploadRoute += '/' + this.auth.selfUserID;
      this.reloadPost();
      setTimeout(() => {
        this.observer = new ResizeObserver(() => this.scrollToElement('action-section'));
        this.contentsContainer = this.elementRef.nativeElement.querySelector('#main');
        this.observer.observe(this.contentsContainer);
      }, 3000);
    })
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.unobserve(this.contentsContainer);
  }

  reloadPost() {
    this.http.get(apiEndPoint + '/post/get_post/' + this.postID).subscribe((res: any) => {
      this.post = res;
      this.title = this.post?.title!;
      this.price = this.post?.price!;
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: [this.title, Validators.required],
      });
      if (this.neighbourhoods.includes(this.post?.neighbourhood!)) {
        this.neighbourhoodSelected = this.post?.neighbourhood!;
      }
      this.contents = this.post?.content!;
    })
  }

  selectNeighbourhood(neighbourhood: string) {
    this.neighbourhoodSelected = neighbourhood;
    this.updateNeighbourhood().subscribe()
  }

  setPrice() {
    this.http.get(apiEndPoint + '/post/update_post_price/' + this.postID + '/' + this.price + '/' + this.auth.selfUserID).subscribe(() => {
      this._snackBar.open('Price updated', 'Understood', {
        duration: 1000,
      });
    })
  }

  setPriceDebounced() {
    clearTimeout(this.changePriceTimeout);
    this.changePriceTimeout = setTimeout(() => {
      this.setPrice();
    }, 300);
  }

  publishPost() {
    if (this.post?.content?.length == 0) {
      this._snackBar.open("Post can't be empty", 'Understood', {
        duration: 2000,
      });
      return;
    }
    if (this.title.length == 0) {
      this._snackBar.open("Post title can't be empty", 'Understood', {
        duration: 2000,
      });
      return;
    }
    // Use forkJoin to run updateGenre() and updateTitle() in parallel
    forkJoin([
      this.updateNeighbourhood(),
      this.updateTitle(),
      this.updatePrice()
    ]).pipe(
      // Use switchMap to switch to the final HTTP request after both updateGenre() and updateTitle() complete
      switchMap(() => this.http.get(apiEndPoint + '/post/toggle_post_publish_status/' + this.postID + '/' + this.auth.selfUserID))
    ).subscribe(() => {
      this.main.reloadPosts();
      this._snackBar.open('Your Post is live!!', 'yay', {
        verticalPosition: 'top',
        duration: 2000,
      });
      // this.dialogRef.close();
      this.router.navigate(["home"]).then();
    });
  }

  updateNeighbourhood(): Observable<any> {
    return this.http.get(apiEndPoint + '/post/update_post_neighbourhood/' + this.postID + '/' + this.neighbourhoodSelected + '/' + this.auth.selfUserID);
  }

  updateTitle(): Observable<any> {
    const maxTitleLength = 70;
    if (!this.firstFormGroup.valid) return EMPTY; // Use EMPTY observable if the form is not valid

    if (this.title.length > maxTitleLength) {
      this.title = this.title.slice(0, maxTitleLength);
      this._snackBar.open('Title too long, will be trimmed', 'Understood', {
        duration: 2000,
      });
    }

    // Use post to update title
    return this.http.post(apiEndPoint + '/post/update_post_title/' + this.postID + '/' + this.auth.selfUserID, this.title);
  }

  updatePrice(): Observable<any> {
    console.log(this.price)
    return this.http.get(apiEndPoint + '/post/update_post_price/' + this.postID + '/' + this.price + '/' + this.auth.selfUserID);
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
    // Clear existing timeout to restart the debounce
    clearTimeout(this.changeTitleTimeout);

    // Set a new timeout to wait for 200ms before calling updateTitle
    this.changeTitleTimeout = setTimeout(() => {
      this.updateTitle().subscribe()
    }, 300);
  }

  //
  // selectionChange($event: StepperSelectionEvent) {
  //   if ($event.selectedIndex === 2 && $event.previouslySelectedIndex === 1) {
  //     this.updateGenre();
  //     this.currentStep = 3;
  //     setTimeout(() => {
  //
  //     }, 100);
  //   } else if ($event.selectedIndex === 1 && $event.previouslySelectedIndex === 0) {
  //     this.updateTitle();
  //     this.currentStep = 2;
  //   }
  // }

  scrollToElement(id: string): void {
    setTimeout(() => {
      if (this.firstLoad) {
        this.firstLoad = false;
        return;
      }
      document.getElementById(id)!.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 100);
  }
}
