import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {apiEndPoint} from "../../env";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FindUserViewComponent} from "./find-user-view/find-user-view.component";

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.css']
})
export class FriendsViewComponent implements OnInit {
  friendIDs: number[] = [];
  loaded: boolean = false;

  constructor(public main: MainService, public http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar, private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.http.get<number[]>(apiEndPoint + '/user/get_friends/' + this.auth.selfUserID).subscribe((data: any) => {
      this.friendIDs = data;
      this.loaded = true;
    })
  }

  searchUser(): void {
    const bottomSheetRef = this._bottomSheet.open(FindUserViewComponent);
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
