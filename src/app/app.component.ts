import {Component} from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import {AuthService} from "./services/auth.service";
import {routerTransition} from "./animations";
import { BackgroundComponent } from './compoents/background/background.component';
import { MainBtnComponent } from './compoents/main-btn/main-btn.component';
import { RainbowStripComponent } from './compoents/rainbow-strip/rainbow-strip.component';
import { CueCardComponent } from './home/cue-card/cue-card.component';
import { LoadingPlaceholderComponent } from './compoents/loading-placeholder/loading-placeholder.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [routerTransition],
    standalone: true,
    imports: [NgIf, LoadingPlaceholderComponent, CueCardComponent, RouterOutlet, RainbowStripComponent, MainBtnComponent, BackgroundComponent]
})
export class AppComponent {
  title = 'Tidder';

  constructor(public router: Router, public auth: AuthService) {
  }

  getState(outlet: any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }
}
