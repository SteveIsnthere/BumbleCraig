import {Component} from '@angular/core';
import {MainService} from "../services/main.service";
import {NotificationViewComponent} from "./notification-view/notification-view.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {StatesService} from "../services/states.service";
import {NewPostViewComponent} from "./post/new-post-view/new-post-view.component";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UserBriefComponent} from "../user/user-brief/user-brief.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public router: Router, public auth: AuthService, public main: MainService, private dialog: MatDialog,
              public states: StatesService) {
    setTimeout(() => {
      this.states.loadedUp = true;
    }, 2000);
  }

  openNotificationView() {
    this.dialog.open(NotificationViewComponent);
  }


  openNewPostView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.auth.selfUserID;
    dialogConfig.backdropClass = 'post-back-drop';

    this.dialog.open(NewPostViewComponent, dialogConfig);
  }

  openUserBriefView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.auth.selfUserID;
    dialogConfig.backdropClass = 'post-back-drop';

    this.dialog.open(UserBriefComponent, dialogConfig);
  }

  notificationCount() {
    return this.main.getTotalMessageCount();
  }

  reloadPage() {
    window.location.reload();
  }
}
