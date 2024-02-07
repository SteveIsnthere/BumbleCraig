import {Component} from '@angular/core';
import {MainService} from "../../../services/main.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {apiEndPoint} from "../../../env";
import { MatProgressBar } from '@angular/material/progress-bar';
import { UserComponent } from '../../../user/user.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';

@Component({
    selector: 'app-find-user-view',
    templateUrl: './find-user-view.component.html',
    styleUrls: ['./find-user-view.component.scss'],
    standalone: true,
    imports: [MatFormField, MatLabel, MatInput, FormsModule, MatIconButton, MatSuffix, MatIcon, UserComponent, MatMiniFabButton, MatProgressBar]
})
export class FindUserViewComponent {
  nameInput: string = '';
  searchResults: number[] = [];
  sentFriendRequests: number[] = [];
  loading: boolean = false

  constructor(public main: MainService, public http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar) {
  }

  changeContent(event: any) {
    this.nameInput = event.target.value;
    this.loading = true;
    this.searchUser()
  }

  searchUser(): void {
    if (this.nameInput.length == 0) return
    this.http.post<number[]>(apiEndPoint + '/user/find_user/' + this.auth.selfUserID, this.nameInput).subscribe((data: any) => {
      this.sentFriendRequests = [];
      this.searchResults = data;
      this.loading = false;
    })
  }

  shouldShowAddFriendButton(userID: number): boolean {
    return !this.sentFriendRequests.includes(userID) && this.auth.selfUserID != userID;
  }

  sendFriendRequest(userID: number): void {
    this.http.get(apiEndPoint + '/user/create_friend_request/' + this.auth.selfUserID + '/' + userID).subscribe(() => {
      this.sentFriendRequests.push(userID);
      this._snackBar.open('Friend request sent!', 'Close', {
        duration: 2000,
      });
    })
  }
}
