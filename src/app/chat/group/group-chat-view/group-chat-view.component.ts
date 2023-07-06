import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Message} from "./Message";
import {apiEndPoint} from "../../../env";
import {AuthService} from "../../../services/auth.service";
import {dummyGroupEssentialData, GroupEssentialData} from "../GroupEssentialData";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FigureEditViewComponent} from "../../../simple-figure/figure-edit-view/figure-edit-view.component";

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
  inputMessage: string = "";

  constructor(public http: HttpClient, public route: ActivatedRoute, public auth: AuthService, private _bottomSheet: MatBottomSheet) {
    this.selfID = this.auth.selfUserID;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupID = params['id'];
      this.http.get<GroupEssentialData>(apiEndPoint + '/group/get_essential_group_data/' + this.groupID).subscribe((data) => {
        this.groupEssentialData = data;
      })
      this.http.get<Message[]>(apiEndPoint + '/group/messages/' + this.groupID).subscribe((data) => {
        this.messages = data;
        setTimeout(() => {
          this.messagesSection.nativeElement.scrollTop = this.messagesSection.nativeElement.scrollHeight;
        }, 200);
      })
    });
  }

  editFigure(): void {
    const bottomSheetRef = this._bottomSheet.open(FigureEditViewComponent, {data: this.groupEssentialData.figure_id});
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.figureComponent.ngOnInit();
    });
  }


  sendMessage(): void {
    let message = prompt("Enter message");
    if (message != null) {
      this.http.get(apiEndPoint + '/group/create_message/' + this.groupID + '/' + this.selfID + '/' + message).subscribe(() => {
        this.ngOnInit();
      })
    }
  }

}
