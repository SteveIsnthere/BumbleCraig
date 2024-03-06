import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { BackBtnComponent } from '../back-btn/back-btn.component';
import { HomeButtonComponent } from '../home-button/home-button.component';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import {AuthService} from "../../services/auth.service";


@Component({
    selector: 'app-main-btn',
    templateUrl: './main-btn.component.html',
    styleUrl: './main-btn.component.scss',
    standalone: true,
    imports: [MatFabButton, RouterLink, MatIcon, HomeButtonComponent, BackBtnComponent]
})
export class MainBtnComponent {
  constructor(public router: Router, public auth: AuthService){
  }
}
