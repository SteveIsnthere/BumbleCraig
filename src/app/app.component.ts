import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tidder';

  constructor(public router: Router, public auth: AuthService) {
  }

}
