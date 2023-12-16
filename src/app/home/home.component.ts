import {Component} from '@angular/core';
import {MainService} from "../services/main.service";
import {NotificationViewComponent} from "./notification-view/notification-view.component";
import {MatDialog} from "@angular/material/dialog";
import {StatesService} from "../services/states.service";
import {NewPostViewComponent} from "./post/new-post-view/new-post-view.component";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public router: Router, public auth: AuthService, public main: MainService, private dialog: MatDialog,
              public states: StatesService, private bottomSheet: MatBottomSheet) {
    setTimeout(() => {
      this.states.loadedUp = true;
    }, 2000);
  }

  openNotificationView() {
    this.dialog.open(NotificationViewComponent);
  }


  openNewPostView() {
    this.dialog.open(NewPostViewComponent);
  }

  openUserBriefView() {
    // this.bottomSheet.open(NewPostViewComponent);
  }

  notificationCount() {
    return this.main.getTotalMessageCount();
  }

  reloadPage() {
    window.location.reload();
  }
}
