import {Component} from '@angular/core';
import {MainService} from "../services/main.service";
import {NotificationViewComponent} from "./notification-view/notification-view.component";
import {MatDialog} from "@angular/material/dialog";
import {StatesService} from "../services/states.service";
import {AskTidderComponent} from "./ask-tidder/ask-tidder.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public main: MainService, private dialog: MatDialog, public states: StatesService) {
    setTimeout(() => {
      this.states.loadedUp = true;
    },2000);
  }

  openNotificationView() {
    this.dialog.open(NotificationViewComponent);
  }

  openAskTidder() {
    this.dialog.open(AskTidderComponent);
  }

  notificationCount() {
    return this.main.getTotalMessageCount();
  }

  reloadPage() {
    window.location.reload();
  }
}
