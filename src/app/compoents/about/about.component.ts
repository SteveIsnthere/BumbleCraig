import {Component} from '@angular/core';
import {credits, siteName} from "../../env";
import { UserComponent } from '../../user/user.component';
import { NgFor } from '@angular/common';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: true,
    imports: [MatDialogContent, NgFor, UserComponent]
})
export class AboutComponent {
  credits = credits;
    protected readonly siteName = siteName;
}
