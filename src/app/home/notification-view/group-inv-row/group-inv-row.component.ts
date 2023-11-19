import {Component, Input} from '@angular/core';
import {GroupInvitation} from "../groupInvitation";
import {MainService} from "../../../services/main.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {apiEndPoint} from "../../../env";

@Component({
  selector: 'app-group-inv-row',
  templateUrl: './group-inv-row.component.html',
  styleUrls: ['./group-inv-row.component.css']
})
export class GroupInvRowComponent {
  @Input() invitation: GroupInvitation | null = null;

  constructor(public main: MainService, public http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar) {
  }

  acceptGroupInvitation(groupInvitation: GroupInvitation) {
    this.http.get(apiEndPoint + '/group/accept-invite/' + groupInvitation.group_id + '/' + this.auth.selfUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.main.fetchNotifications(true).subscribe()
    })
  }

  rejectGroupInvitation(groupInvitation: GroupInvitation) {
    this.http.get(apiEndPoint + '/group/decline-invite/' + groupInvitation.group_id + '/' + this.auth.selfUserID).subscribe((data: any) => {
      this.openSnackBar(data, 'Close');
      this.main.fetchNotifications(true).subscribe()
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000});
  }
}
