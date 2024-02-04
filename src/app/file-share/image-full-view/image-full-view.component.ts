import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-image-full-view',
    templateUrl: './image-full-view.component.html',
    styleUrls: ['./image-full-view.component.css'],
    standalone: true
})
export class ImageFullViewComponent {
  imageSrc: string = this.data;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
