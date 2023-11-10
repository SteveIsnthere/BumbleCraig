import {Component, Input, OnInit} from '@angular/core';
import {dummyEssentialUserData, EssentialUserData} from "./UserModel";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../env";
import {UserInfoCachingService} from "../services/user-info-caching.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() userID: number = 0;
  essentialUserData: EssentialUserData = dummyEssentialUserData;

  constructor(public http: HttpClient, public cache: UserInfoCachingService) {
  }

  ngOnInit(): void {
    this.http.get<EssentialUserData>(apiEndPoint + '/user/' + this.userID).subscribe((data) => {
      if (data == this.essentialUserData) {
        return;
      }
      this.cache.set(data);
      this.essentialUserData = data;
    })

    let cachedData = this.cache.get(this.userID);
    if (cachedData != null) {
      this.essentialUserData = cachedData;
    }
  }
}
