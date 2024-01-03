import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewPostViewComponent} from "../post/new-post-view/new-post-view.component";

@Component({
  selector: 'app-cue-card',
  templateUrl: './cue-card.component.html',
  styleUrl: './cue-card.component.css'
})
export class CueCardComponent {
  constructor(public auth: AuthService,private dialog: MatDialog) {
  }


  openNewPostView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.auth.selfUserID;
    dialogConfig.backdropClass = 'post-back-drop';

    this.dialog.open(NewPostViewComponent, dialogConfig);
  }
}
