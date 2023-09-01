import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {StatesService} from "./services/states.service";
import {NewPostViewComponent} from "./home/post/new-post-view/new-post-view.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tidder';

  constructor(public router: Router, public auth: AuthService, public states: StatesService, public dialog: MatDialog) {
  }

  openNewPostView() {
    this.dialog.open(NewPostViewComponent);
  }
}
