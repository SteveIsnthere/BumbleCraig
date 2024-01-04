import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";
import {dummyGroupEssentialData, GroupEssentialData} from "./GroupEssentialData";
import {GroupBasicInfoCachingService} from "../../services/group-basic-info-caching.service";

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

  constructor(public http: HttpClient, private cache: GroupBasicInfoCachingService) {
  }

  ngOnInit(): void {
    let cachedData = this.cache.get(this.groupID);
    if (cachedData) {
      this.groupEssentialData = cachedData;
      if (Math.random() < 0.5) {
        return
      }
      setTimeout(() => {
        this.http.get<GroupEssentialData>(apiEndPoint + '/group/get_essential_group_data/' + this.groupID).subscribe((data) => {
          if (data != this.groupEssentialData) {
            this.groupEssentialData = data;
            this.cache.set(data);
          }
        })
      }, 1000 + Math.random() * 3000)
    } else {
      this.http.get<GroupEssentialData>(apiEndPoint + '/group/get_essential_group_data/' + this.groupID).subscribe((data) => {
        this.groupEssentialData = data;
        this.cache.set(data);
      })
    }
  }

  stopProp(e: Event) {
    e.stopPropagation()
  }
}
