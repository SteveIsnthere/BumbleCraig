import {Component, Input} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-rainbow-strip',
    templateUrl: './rainbow-strip.component.html',
    styleUrls: ['./rainbow-strip.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class RainbowStripComponent {
  @Input() bottom: boolean = false;
}
