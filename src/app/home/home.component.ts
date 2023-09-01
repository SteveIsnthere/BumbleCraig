import {Component} from '@angular/core';
import {MainService} from "../services/main.service";
import {NotificationViewComponent} from "./notification-view/notification-view.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(public main: MainService, private dialog: MatDialog) {
  }

  openNotificationView() {
    this.dialog.open(NotificationViewComponent);
  }

  notificationCount() {
    return this.main.getTotalMessageCount();
  }

  reloadPage() {
    window.location.reload();
  }
}
