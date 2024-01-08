import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewPostViewComponent} from "../post/new-post-view/new-post-view.component";
import {MainService} from "../../services/main.service";
import {apiEndPoint} from "../../env";
import {HttpClient} from "@angular/common/http";
import {UserSetUpComponent} from "../../user/user-set-up/user-set-up.component";
import {AskTidderComponent} from "../ask-tidder/ask-tidder.component";
import {NotificationViewComponent} from "../notification-view/notification-view.component";

@Component({
  selector: 'app-cue-card',
  templateUrl: './cue-card.component.html',
  styleUrl: './cue-card.component.css'
})
export class CueCardComponent implements OnInit, OnDestroy {
  topUserIDs: number[] = [];
  scrollingDown = false;
  lastScrollTop: number = 0;

  constructor(public auth: AuthService, private dialog: MatDialog, public main: MainService, public http: HttpClient) {
    this.lastScrollTop = 0;
  }

  ngOnInit(): void {
    this.http.get<number[]>(apiEndPoint + '/others/top-users/').subscribe((data) => {
      this.topUserIDs = data;
    })
    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const scrollTop = window.scrollY;
    const deltaScroll = window.scrollY - this.lastScrollTop;
    this.lastScrollTop = scrollTop;

    if (scrollTop < 50) {
      this.scrollingDown = false;
      return;
    }
    this.scrollingDown = deltaScroll > 0;
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

    this.dialog.open(NotificationViewComponent, dialogConfig);
  }

  openAssistant() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'post-back-drop';
    this.dialog.open(AskTidderComponent, dialogConfig);
  }

  userSetUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'post-back-drop';
    this.dialog.open(UserSetUpComponent, dialogConfig);
  }

  logout() {
    this.auth.logout();
  }
}
