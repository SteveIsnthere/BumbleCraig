import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-button',
  standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        RouterLink
    ],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {

}
