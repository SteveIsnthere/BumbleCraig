import {Component} from '@angular/core';
import {credits, siteName} from "../../env";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  credits = credits;
    protected readonly siteName = siteName;
}
