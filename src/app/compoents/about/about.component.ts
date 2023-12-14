import { Component } from '@angular/core';
import {credits} from "../../env";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
credits = credits;
}
