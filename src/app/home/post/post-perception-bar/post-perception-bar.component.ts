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
    return Math.floor(this.rating * 5)+1;
  }

  ratingText(): string {
    const score = this.ratingScore();
    if (score == 1) return 'one';
    if (score == 2) return 'two';
    return score.toString();
  }

  ratingColor(): string {
    const score = this.ratingScore();
    if (score == 1) return '#FF0000';
    if (score == 2) return '#ffb700';
    if (score == 3) return '#e6ff00';
    if (score == 4) return '#00FF00';
    return '#0000FF';
  }
}
