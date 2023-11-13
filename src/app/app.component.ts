import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {StatesService} from "./services/states.service";
import {MatDialog} from "@angular/material/dialog";
import {AskTidderComponent} from "./home/ask-tidder/ask-tidder.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tidder';

  constructor(public router: Router, public auth: AuthService, public states: StatesService, public dialog: MatDialog) {
  }

  openAskTidder() {
    this.dialog.open(AskTidderComponent);
  }
}
