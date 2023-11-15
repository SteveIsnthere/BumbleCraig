import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-rainbow-strip',
  templateUrl: './rainbow-strip.component.html',
  styleUrls: ['./rainbow-strip.component.css']
})
export class RainbowStripComponent {
  @Input() bottom: boolean = false;
}
