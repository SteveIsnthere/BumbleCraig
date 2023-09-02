import {Component, Input, OnInit} from '@angular/core';
import {dummyEssentialUserData, EssentialUserData} from "./UserModel";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../env";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() userID: number = 0;
  essentialUserData: EssentialUserData = dummyEssentialUserData;

  constructor(public http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<EssentialUserData>(apiEndPoint + '/user/' + this.userID).subscribe((data) => {
      this.essentialUserData = data;
    })
  }
}
