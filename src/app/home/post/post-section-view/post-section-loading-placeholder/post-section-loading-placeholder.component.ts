import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AboutComponent} from "../../../../compoents/about/about.component";

@Component({
  selector: 'app-post-section-loading-placeholder',
  templateUrl: './post-section-loading-placeholder.component.html',
  styleUrls: ['./post-section-loading-placeholder.component.css']
})
export class PostSectionLoadingPlaceholderComponent {
  constructor(private dialog: MatDialog) {
  }

  openAbout() {
    this.dialog.open(AboutComponent);
  }
}
