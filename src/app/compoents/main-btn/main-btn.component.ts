import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {StatesService} from "../../services/states.service";

@Component({
  selector: 'app-main-btn',
  templateUrl: './main-btn.component.html',
  styleUrl: './main-btn.component.css'
})
export class MainBtnComponent {
  constructor(public router: Router, public states: StatesService) {
  }
}
