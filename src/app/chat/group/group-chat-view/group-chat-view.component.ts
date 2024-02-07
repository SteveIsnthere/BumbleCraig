import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Message} from "./Message";
import {apiEndPoint} from "../../../env";
import {AuthService} from "../../../services/auth.service";
import {dummyGroupEssentialData, GroupEssentialData} from "../GroupEssentialData";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FigureEditViewComponent} from "../../../simple-figure/figure-edit-view/figure-edit-view.component";
import {TextEditViewComponent} from "../../text-edit-view/text-edit-view.component";
import {InviteViewComponent} from "../invite-view/invite-view.component";
import {Observable} from "rxjs";
import { LoadingPlaceholderComponent } from '../../../compoents/loading-placeholder/loading-placeholder.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatChipOption } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { FileShareComponent } from '../../../file-share/file-share.component';
import { UserMiniComponent } from '../../../user/user-mini/user-mini.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-group-chat-view',
    templateUrl: './group-chat-view.component.html',
    styleUrls: ['./group-chat-view.component.scss'],
    standalone: true,
    imports: [NgClass, UserMiniComponent, FileShareComponent, MatButton, MatIcon, MatChipOption, MatProgressBar, LoadingPlaceholderComponent]
})
export class GroupChatViewComponent implements OnInit, OnDestroy {
  @ViewChild('messagesSection', {static: true}) messagesSection: any;
  @ViewChild('figure', {static: false}) figureComponent: any;
  groupID: number = 0;
  messages: Message[] = [];
  selfID: number = 0;
  loading: boolean = true;
  groupEssentialData: GroupEssentialData = dummyGroupEssentialData();
  uploadRoute: string = '/group/create_file_share/';
  fileToUpload: File | null = null;
  noMessages: boolean = false;
  uploadingFile: boolean = false;
  shouldLoadMessages: boolean = true;
  resizing: boolean = false;
  resizeCheckInterval: any;
  lastWindowScrollHeight: number = 0;

  constructor(public http: HttpClient, public route: ActivatedRoute, public auth: AuthService, private _bottomSheet: MatBottomSheet) {
    this.selfID = this.auth.selfUserID;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupID = params['id'];
      this.uploadRoute += this.groupID;
      this.uploadRoute += '/' + this.auth.selfUserID;
      this.http.get<GroupEssentialData>(apiEndPoint + '/group/get_essential_group_data/' + this.groupID).subscribe((data) => {
        this.groupEssentialData = data;
      })
      this.setMessageRefreshLoop()
      this.viewGroup();
    });

    this.resizeCheckInterval = setInterval(() => {
      if (document.body.scrollHeight > this.lastWindowScrollHeight) {
        this.lastWindowScrollHeight = document.body.scrollHeight;
        this.onHeightChange();
      }
    }, 200);

    //change body background color to black
    // document.body.style.backgroundColor = 'black';
  }

  ngOnDestroy(): void {
    // document.body.style.backgroundColor = '#191919';
    this.shouldLoadMessages = false;
    // if (this.loadedScroller) {
    //   this.observer.unobserve(this.messagesContainer);
    // }
    clearInterval(this.resizeCheckInterval);
  }

  setMessageRefreshLoop() {
    if (!this.shouldLoadMessages) return;
    this.loadMessages().subscribe(() => {
      setTimeout(() => {
        this.setMessageRefreshLoop();
      }, 5000);
    })
  }

  loadMessages(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<Message[]>(apiEndPoint + '/group/messages/' + this.groupID + '/' + this.auth.selfUserID).subscribe((data) => {
        this.loading = false;
        if (data.length === 0) {
          this.noMessages = true;
          observer.next(true);
          observer.complete();
          return;
        }

        if (!this.messagesHasChanged(data)) {
          observer.next(true);
          observer.complete();
          return;
        }

        if (this.messages.length > 0) {
          let numberOfNewMessages = 0;
          for (let i = 0; i < data.length; i++) {
            if (this.areMessagesSame(data[data.length - 1 - i], this.messages[this.messages.length - 1])) {
              break;
            }
            numberOfNewMessages++;
          }
          for (let i = data.length - numberOfNewMessages; i < data.length; i++) {
            this.messages.push(data[i]);
          }
        } else {
          this.messages = data;
        }

        setTimeout(() => {
          this.viewGroup();
        }, 10);
        observer.next(true);
        observer.complete();
      });
    });
  }

  messagesHasChanged(newData: Message[]) {
    const newDataLength = newData.length;
    const oldDataLength = this.messages.length;
    if (newDataLength != oldDataLength) {
      return true;
    }
    return !this.areMessagesSame(newData[newDataLength - 1], this.messages[oldDataLength - 1]);
  }

  areMessagesSame(msg1: Message, msg2: Message) {
    if (msg1.content != msg2.content) {
      return false;
    }
    if (msg1.sender_id != msg2.sender_id) {
      return false;
    }
    return msg1.file_share_id == msg2.file_share_id;
  }

  onScrollThrottled() {
    if (!this.resizing) {
      this.resizing = true;
      this.onHeightChange();
    }
  }

  onHeightChange() {
    // setTimeout(() => {
    //   this.messagesSection.nativeElement.scrollTop = this.messagesSection.nativeElement.scrollHeight;
    //   this.resizing = false;
    // }, 150);

    // window.scrollTo(0, document.body.scrollHeight);
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  viewGroup(): void {
    this.http.get(apiEndPoint + '/group/visit/' + this.groupID + '/' + this.selfID).subscribe(() => {
    })
  }

  editFigure(): void {
    const bottomSheetRef = this._bottomSheet.open(FigureEditViewComponent, {data: this.groupEssentialData.figure_id});
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.figureComponent.ngOnInit();
    });
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

      this.http.post(apiEndPoint + "/group/create_message/" + this.groupID + "/" + this.auth.selfUserID, textContent)
        .subscribe(() => {
          this.loadMessages().subscribe()
        })
    });
  }

  uploadFile(event: any) {
    this.uploadingFile = true;
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload === null || this.uploadRoute === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.http.post<string>(apiEndPoint + this.uploadRoute, formData).subscribe(
      () => {
        this.uploadingFile = false;
        this.fileToUpload = null;
        console.log('File uploaded successfully');
        this.loadMessages().subscribe()
      },
      (error) => {
        this.uploadingFile = false;
        console.error('Error uploading file:', error);
      }
    );
  }

  openInviteView() {
    this._bottomSheet.open(InviteViewComponent, {data: this.groupID});
  }

  // initMessages() {
  //   this.http.get<Message[]>(apiEndPoint + '/group/messages/' + this.groupID + '/' + this.auth.selfUserID).subscribe((data) => {
  //     if (data.length == 0) {
  //       this.noMessages = true;
  //       return;
  //     } else if (!this.loadedScroller) {
  //       this.noMessages = false;
  //       this.loadedScroller = true;
  //       this.messagesContainer = this.elementRef.nativeElement.querySelector(
  //         '#messages-container'
  //       );
  //       this.observer = new ResizeObserver(() => this.onHeightChange());
  //       this.observer.observe(this.messagesContainer);
  //     }
  //
  //     if (!this.messagesHasChanged(data)) {
  //       return;
  //     }
  //
  //     if (this.messages.length > 0) {
  //       let numberOfNewMessages = 0;
  //       for (let i = 0; i < data.length; i++) {
  //         if (this.areMessagesSame(data[data.length - 1 - i], this.messages[this.messages.length - 1])) {
  //           break;
  //         }
  //         numberOfNewMessages++;
  //       }
  //       for (let i = data.length - numberOfNewMessages; i < data.length; i++) {
  //         this.messages.push(data[i]);
  //       }
  //     } else {
  //       this.messages = data;
  //     }
  //
  //     // setTimeout(() => {
  //     //   this.viewGroup();
  //     // }, 5000);
  //   })
  // }

}
