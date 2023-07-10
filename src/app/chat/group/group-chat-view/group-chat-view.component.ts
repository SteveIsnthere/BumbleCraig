import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-group-chat-view',
  templateUrl: './group-chat-view.component.html',
  styleUrls: ['./group-chat-view.component.css']
})
export class GroupChatViewComponent implements OnInit {
  @ViewChild('messagesSection', {static: true}) messagesSection: any;
  @ViewChild('figure', {static: false}) figureComponent: any;
  groupID: number = 0;
  messages: Message[] = [];
  selfID: number = 0;
  groupEssentialData: GroupEssentialData = dummyGroupEssentialData();
  uploadRoute: string = '/group/create_file_share/';
  fileToUpload: File | null = null;

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
      this.initMessages()
    });
  }

  initMessages() {
    this.http.get<Message[]>(apiEndPoint + '/group/messages/' + this.groupID).subscribe((data) => {
      this.messages = data;
      setTimeout(() => {
        this.messagesSection.nativeElement.scrollTop = this.messagesSection.nativeElement.scrollHeight;
      }, 200);
      setTimeout(() => {
        this.viewGroup();
      }, 1000);
    })
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

      this.http.get(apiEndPoint + "/group/create_message/" + this.groupID + "/" + this.auth.selfUserID + "/" + textContent)
        .subscribe(() => {
          this.initMessages();
        })
    });
  }

  uploadFile(event: any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload === null || this.uploadRoute === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.http.post<string>(apiEndPoint + this.uploadRoute, formData).subscribe(
      () => {
        this.fileToUpload = null;
        console.log('File uploaded successfully');
        this.initMessages();
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  openInviteView() {
    this._bottomSheet.open(InviteViewComponent, {data: this.groupID});
  }
}
