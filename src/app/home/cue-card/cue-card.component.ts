import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewPostViewComponent} from "../post/new-post-view/new-post-view.component";
import {MainService} from "../../services/main.service";
import {UserBriefComponent} from "../../user/user-brief/user-brief.component";
import {apiEndPoint} from "../../env";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cue-card',
  templateUrl: './cue-card.component.html',
  styleUrl: './cue-card.component.css'
})
export class CueCardComponent implements OnInit{
  topUserIDs: number[] = [];
  constructor(public auth: AuthService, private dialog: MatDialog, public main: MainService, public http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<number[]>(apiEndPoint + '/others/top-users/').subscribe((data) => {
      this.topUserIDs = data;
    })
  }


  openNewPostView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.auth.selfUserID;
    dialogConfig.backdropClass = 'post-back-drop';

    this.dialog.open(NewPostViewComponent, dialogConfig);
  }

  notificationCount() {
    return this.main.getTotalMessageCount();
  }

  openUserBriefView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'post-back-drop';

    this.dialog.open(UserBriefComponent, dialogConfig);
  }

  mbc(i: number) {
    switch (i) {
      case 0:
        return 'primary'
      case 1:
        return 'accent'
      case 2:
        return 'warn'
      default:
        return 'primary'
    }
  }
}
