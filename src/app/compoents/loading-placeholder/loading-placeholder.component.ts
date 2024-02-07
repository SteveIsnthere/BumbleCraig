import { Component } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
    selector: 'app-loading-placeholder',
    templateUrl: './loading-placeholder.component.html',
    styleUrl: './loading-placeholder.component.scss',
    standalone: true,
    imports: [MatProgressBar]
})
export class LoadingPlaceholderComponent {
  constructor() {
  }
}
