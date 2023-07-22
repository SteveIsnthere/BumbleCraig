import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-post-perception-bar',
  templateUrl: './post-perception-bar.component.html',
  styleUrls: ['./post-perception-bar.component.css']
})
export class PostPerceptionBarComponent {
  @Input() rating: number = 0.5;
  @Input() popularity: number = 5;

  ratingScore(): number {
    return Math.round(this.rating * 10);
  }
}
