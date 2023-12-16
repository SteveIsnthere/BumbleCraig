import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-brief',
  templateUrl: './user-brief.component.html',
  styleUrl: './user-brief.component.css'
})
export class UserBriefComponent {
  selfUserID = this.data;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService) { }

  quitBottomSheet() {

  }

  logout() {
    this.auth.logout();
  }
}
