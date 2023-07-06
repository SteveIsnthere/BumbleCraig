import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../env";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  groupIDs: number[] = [];
  groupWithUnreadIDs: number[] = [];

  constructor(public http: HttpClient, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.http.get<number[]>(apiEndPoint + '/group/get_joined_groups/' + this.auth.selfUserID).subscribe((data) => {
      this.groupIDs = data;
      this.http.get<number[]>(apiEndPoint + '/group/get_joined_groups_with_unread_msg/' + this.auth.selfUserID).subscribe((data) => {
        this.groupWithUnreadIDs = data;
      })
    })
  }

  createGroup(): void {
    let groupName = prompt("Enter group name");
    if (groupName != null) {
      this.http.get(apiEndPoint + '/group/create_new/' + this.auth.selfUserID + '/' + groupName).subscribe(() => {
        this.ngOnInit();
      })
    }
  }

  isGroupUnread(groupID: number): boolean {
    return this.groupWithUnreadIDs.includes(groupID);
  }
}
