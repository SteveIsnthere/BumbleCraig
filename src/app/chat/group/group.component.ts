import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";
import {dummyGroupEssentialData, GroupEssentialData} from "./GroupEssentialData";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})

export class GroupComponent implements OnInit {
  @Input() groupID: number = 0;
  @Input() selfID: number = 0;
  @Input() unread = false;
  groupEssentialData: GroupEssentialData = dummyGroupEssentialData();

  constructor(public http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<GroupEssentialData>(apiEndPoint + '/group/get_essential_group_data/' + this.groupID).subscribe((data) => {
      this.groupEssentialData = data;
    })
  }

  viewGroup(): void {
    this.http.get(apiEndPoint + '/group/visit/' + this.groupID + '/' + this.selfID).subscribe(() => {
    })
  }
}
