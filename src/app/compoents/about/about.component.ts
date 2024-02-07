import {Component} from '@angular/core';
import {credits, siteName} from "../../env";
import { UserComponent } from '../../user/user.component';

import { MatDialogContent } from '@angular/material/dialog';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: true,
    imports: [MatDialogContent, UserComponent]
})
export class AboutComponent {
  credits = credits;
    protected readonly siteName = siteName;
}
