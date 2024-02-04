import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import { ReusableCommentsViewComponent } from './reusable-comments-view/reusable-comments-view.component';

@Component({
    selector: 'app-post-comments-view',
    templateUrl: './post-comments-view.component.html',
    styleUrls: ['./post-comments-view.component.css'],
    standalone: true,
    imports: [ReusableCommentsViewComponent]
})
export class PostCommentsViewComponent {
  postID: number = 0;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.postID = data;
  }
}
