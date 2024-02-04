import {Component, Input, OnInit} from '@angular/core';
import {dummyEssentialUserData, EssentialUserData} from "./UserModel";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../env";
import {UserInfoCachingService} from "../services/user-info-caching.service";
import { SimpleFigureComponent } from '../simple-figure/simple-figure.component';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink, SimpleFigureComponent]
})
export class UserComponent implements OnInit {
  @Input() userID: number = 0;
  essentialUserData: EssentialUserData = dummyEssentialUserData;

  constructor(public http: HttpClient, public cache: UserInfoCachingService) {
  }

  ngOnInit(): void {
    let cachedData = this.cache.get(this.userID);
    if (cachedData != null) {
      this.essentialUserData = cachedData;
      setTimeout(() => {
        this.http.get<EssentialUserData>(apiEndPoint + '/user/' + this.userID).subscribe((data) => {
          if (data == this.essentialUserData) {
            return;
          }
          this.cache.set(data);
          this.essentialUserData = data;
        })
      }, Math.random()*2000);
    }else {
      this.http.get<EssentialUserData>(apiEndPoint + '/user/' + this.userID).subscribe((data) => {
        this.cache.set(data);
        this.essentialUserData = data;
      })
    }
  }
}
