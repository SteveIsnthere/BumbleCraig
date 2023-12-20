import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AboutComponent} from "../about/about.component";

@Component({
  selector: 'app-loading-placeholder',
  templateUrl: './loading-placeholder.component.html',
  styleUrl: './loading-placeholder.component.css'
})
export class LoadingPlaceholderComponent {
  constructor(private dialog: MatDialog) {
  }

  openAbout() {
    this.dialog.open(AboutComponent);
  }
}
