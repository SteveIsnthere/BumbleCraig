import {Component} from '@angular/core';
import {MainService} from "../services/main.service";
import {StatesService} from "../services/states.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public router: Router, public main: MainService, public states: StatesService) {
    setTimeout(() => {
      this.states.loadedUp = true;
    }, 2000);
  }
}
