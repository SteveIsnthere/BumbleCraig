import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {apiEndPoint} from "../../../env";

@Component({
  selector: 'app-group-members-view',
  templateUrl: './group-members-view.component.html',
  styleUrl: './group-members-view.component.css'
})
export class GroupMembersViewComponent implements OnInit {
  groupID: number = 0;
  memberIDs: number[] = [];


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public group_id: number, private http: HttpClient, public auth: AuthService, private _snackBar: MatSnackBar) {
    this.groupID = group_id;
  }

  ngOnInit(): void {
    this.http.get<number[]>(apiEndPoint + '/group/get_group_members_ids/' + this.groupID + '/' + this.auth.selfUserID).subscribe((data) => {
      this.memberIDs = data;
    })
  }
}
